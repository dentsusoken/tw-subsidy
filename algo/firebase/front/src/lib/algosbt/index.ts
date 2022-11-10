import {
  generateAccount,
  decodeAddress,
  encodeObj,
  decodeObj,
  Algodv2,
} from 'algosdk';

import {
  DidAccount,
  VerifiableMessage,
  VerifiableCredential,
  VerifiableCredentialContent,
  Message,
} from './types';
import { encryptByPassword, decryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { sign, verify } from './utils/naclUtils';
import createRevokedApp from './transactions/createRevokedApp';
import setRevoked from './transactions/setRevoked';
import getGlobalState from './algod/getGlobalState';
import * as didUtils from './utils/didUtils';

export const createDidAccount = (password: string): DidAccount => {
  const account = generateAccount();
  const encSecretKey = encryptByPassword(account.sk, password);
  const address = account.addr;
  const did = didUtils.didFromAddress(address);

  return { did, address, encSecretKey };
};

export const restoreDidAccount = (
  encSecretKey: Uint8Array,
  password: string
): DidAccount => {
  const secretKey = decryptByPassword(encSecretKey, password);
  const address = addressFromSecretKey(secretKey);
  const did = didUtils.didFromAddress(address);

  return { did, address, encSecretKey };
};

export const createVerifiableMessage = <T>(
  senderDidAccount: DidAccount,
  receiverDid: string,
  content: T,
  password: string
): VerifiableMessage<T> => {
  const message: Message<T> = {
    senderDid: senderDidAccount.did,
    receiverDid,
    content,
  };
  const encodedMessage = encodeObj(message);
  const secretKey = decryptByPassword(senderDidAccount.encSecretKey, password);
  const signature = sign(encodedMessage, secretKey);

  const vm: VerifiableMessage<T> = {
    message: decodeObj(encodedMessage),
    signature,
  };

  return vm;
};

export const verifyVerifiableMessage = (vm: VerifiableMessage<unknown>) => {
  const address = didUtils.addressFromDid(vm.message.senderDid);
  const { publicKey } = decodeAddress(address);
  const encodedMessage = encodeObj(vm.message);

  return verify(encodedMessage, vm.signature, publicKey);
};

export type CreateVCParams<T> = {
  holderDid: string;
  content: T;
};

export const createVerifiableCredential = async <T>(
  algod: Algodv2,
  issuerDidAccount: DidAccount,
  holderDid: string,
  content: T,
  password: string
) => {
  const secretKey = decryptByPassword(issuerDidAccount.encSecretKey, password);
  const from = addressFromSecretKey(secretKey);
  const appIndex = await createRevokedApp(algod, { from }, secretKey);
  const vcContent: VerifiableCredentialContent<T> = {
    appIndex,
    content,
  };

  return createVerifiableMessage(
    issuerDidAccount,
    holderDid,
    vcContent,
    password
  );
};

export const verifyVerifiableCredential = async (
  algod: Algodv2,
  vc: VerifiableCredential<unknown>
) => {
  try {
    if (!verifyVerifiableMessage(vc)) {
      return false;
    }

    const appIndex = vc.message.content.appIndex;

    const state = await getGlobalState(algod, appIndex);

    return state.revoked === 0;
  } catch (ignore) {}

  return false;
};

export const revokeVerifiableCredential = async (
  algod: Algodv2,
  issuerDidAccount: DidAccount,
  vc: VerifiableCredential<unknown>,
  password: string,
  value = 1
) => {
  const from = didUtils.addressFromDid(issuerDidAccount.did);
  const appIndex = vc.message.content.appIndex;
  const issuerSecretKey = decryptByPassword(
    issuerDidAccount.encSecretKey,
    password
  );

  await setRevoked(algod, { from, appIndex, value }, issuerSecretKey);
};
