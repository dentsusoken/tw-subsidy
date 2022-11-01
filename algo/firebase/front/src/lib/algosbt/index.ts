import algosdk from 'algosdk';
import {
  generateAccount,
  decodeAddress,
  encodeObj,
  decodeObj,
  Algodv2,
} from 'algosdk';

import { DidAccount, VCRequest, VC, VCMessage } from './types';
import {
  encryptByPassword,
  decryptByPassword,
  encryptBySecretKey,
  decryptBySecretKey,
} from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { sign, verify } from './utils/naclUtils';
import createRevokedApp from './transactions/createRevokedApp';
import createAsset from './transactions/createAsset';
import saveMessage from './transactions/saveMessage';
import setRevoked from './transactions/setRevoked';
import getGlobalState from './algod/getGlobalState';
import removeClawback from './transactions/removeCrawback';
import loadMessage from './transactions/loadMessage';
import * as didUtils from './utils/didUtils';

export const createDidAccount = (password: string): DidAccount => {
  const account = generateAccount();
  const encSecretKey = encryptByPassword(account.sk, password);
  const did = didUtils.didFromAddress(account.addr);

  return { did, encSecretKey };
};

export const restoreDidAccount = (
  encSecretKey: Uint8Array,
  password: string
): DidAccount => {
  const secretKey = decryptByPassword(encSecretKey, password);
  const address = addressFromSecretKey(secretKey);
  const did = didUtils.didFromAddress(address);

  return { did, encSecretKey };
};

export const createVCRequest = <T>(
  holderDidAccount: DidAccount,
  message: T,
  password: string
): VCRequest<T> => {
  const encodedMessage = encodeObj(message);
  const secretKey = decryptByPassword(holderDidAccount.encSecretKey, password);
  const signature = sign(encodedMessage, secretKey);

  return {
    holderDid: holderDidAccount.did,
    message: decodeObj(encodedMessage),
    signature,
  };
};

export const verifyVCRequest = (req: VCRequest<unknown>) => {
  const address = didUtils.addressFromDid(req.holderDid);
  const { publicKey } = decodeAddress(address);
  const encodedMessage = encodeObj(req.message);

  return verify(encodedMessage, req.signature, publicKey);
};

export type CreateVCParams<T> = {
  holderDid: string;
  content: T;
};

export const createVC = async <T>(
  algod: Algodv2,
  issuerDidAccount: DidAccount,
  { holderDid, content }: CreateVCParams<T>,
  password: string
) => {
  const secretKey = decryptByPassword(issuerDidAccount.encSecretKey, password);
  const from = addressFromSecretKey(secretKey);
  const appIndex = await createRevokedApp(algod, { from }, secretKey);
  const message: VCMessage<T> = {
    holderDid,
    appIndex,
    content: decodeObj(encodeObj(content)),
  };
  const encodedMessage = encodeObj(message);
  const signature = sign(encodedMessage, secretKey);
  const vc: VC<T> = { issuerDid: issuerDidAccount.did, message, signature };

  return vc;
};

export const verifyVC = async (algod: Algodv2, vc: VC<unknown>) => {
  try {
    const address = didUtils.addressFromDid(vc.issuerDid);
    const { publicKey } = decodeAddress(address);
    const encodedMessage = encodeObj(vc.message);

    if (verify(encodedMessage, vc.signature, publicKey)) {
      const appIndex = vc.message.appIndex;

      const state = await getGlobalState(algod, appIndex);

      return state.revoked === 0;
    }
  } catch (ignore) {}

  return false;
};

export const revokeVC = async (
  algod: Algodv2,
  issuerDidAccount: DidAccount,
  vc: VC<unknown>,
  password: string,
  value = 1
) => {
  const from = didUtils.addressFromDid(issuerDidAccount.did);
  const appIndex = vc.message.appIndex;
  const issuerSecretKey = decryptByPassword(
    issuerDidAccount.encSecretKey,
    password
  );

  await setRevoked(algod, { from, appIndex, value }, issuerSecretKey);
};

export type SaveVCParams<T = any> = {
  vc: VC<T>;
  assetName: string;
};

export const saveVC = async <T = any>(
  algod: Algodv2,
  holderDidAccount: DidAccount,
  { vc, assetName }: SaveVCParams<T>,
  password: string
) => {
  if (Buffer.from(assetName).length > 32) {
    throw new Error(`Max size of assetName is 32 bytes`);
  }

  const secretKey = decryptByPassword(holderDidAccount.encSecretKey, password);
  const from = didUtils.addressFromDid(holderDidAccount.did);
  const message = encryptBySecretKey(encodeObj(vc), secretKey);

  const assetIndex = await createAsset(algod, { from, assetName }, secretKey);
  await saveMessage(algod, { from, message, assetIndex }, secretKey);
  await removeClawback(algod, { from, assetIndex }, secretKey);

  return assetIndex;
};

export const loadVC = async <T = any>(
  indexer: algosdk.Indexer,
  holderDidAccount: DidAccount,
  assetIndex: number,
  password: string
) => {
  const secretKey = decryptByPassword(holderDidAccount.encSecretKey, password);
  const encryptVC = await loadMessage(indexer, assetIndex);
  const encodedVC = decryptBySecretKey(encryptVC, secretKey);
  const vc: VC<T> = decodeObj(encodedVC);

  return vc;
};
