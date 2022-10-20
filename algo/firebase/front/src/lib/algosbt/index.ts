import algosdk from 'algosdk';
import {
  generateAccount,
  decodeAddress,
  encodeObj,
  decodeObj,
  Algodv2,
} from 'algosdk';

import { EncAccount, SBTRequest, SBT, SBTMessage } from './types';
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
import getGlobalState from './algod/getGlobalState';
import removeClawback from './transactions/removeCrawback';
import loadMessage from './transactions/loadMessage';

export const createEncAccount = (password: string): EncAccount => {
  const account = generateAccount();
  const encSecretKey = encryptByPassword(account.sk, password);

  return { address: account.addr, encSecretKey };
};

export const restoreEncAccount = (
  encSecretKey: Uint8Array,
  password: string
): EncAccount => {
  const secretKey = decryptByPassword(encSecretKey, password);
  const address = addressFromSecretKey(secretKey);

  return { address, encSecretKey };
};

export const createSBTRequest = <T>(
  holderAddress: string,
  message: T,
  secretKey: Uint8Array
): SBTRequest<T> => {
  const encodedMessage = encodeObj(message);
  const signature = sign(encodedMessage, secretKey);

  return { holderAddress, message: decodeObj(encodedMessage), signature };
};

export const verifySBTRequest = (req: SBTRequest<unknown>) => {
  const { publicKey } = decodeAddress(req.holderAddress);
  const encodedMessage = encodeObj(req.message);

  return verify(encodedMessage, req.signature, publicKey);
};

export type SBTParams<T> = {
  issuerAddress: string;
  holderAddress: string;
  content: T;
};

export const createSBT = async <T>(
  algod: Algodv2,
  { issuerAddress, holderAddress, content }: SBTParams<T>,
  secretKey: Uint8Array
) => {
  const appIndex = await createRevokedApp(
    algod,
    { from: issuerAddress },
    secretKey
  );
  const message: SBTMessage<T> = {
    holderAddress,
    appIndex,
    content: decodeObj(encodeObj(content)),
  };
  const encodedMessage = encodeObj(message);
  const signature = sign(encodedMessage, secretKey);

  return { issuerAddress, message, signature } as SBT<T>;
};

export const verifySBT = async (algod: Algodv2, sbt: SBT<unknown>) => {
  try {
    const { publicKey } = decodeAddress(sbt.issuerAddress);
    const encodedMessage = encodeObj(sbt.message);

    if (verify(encodedMessage, sbt.signature, publicKey)) {
      const appIndex = sbt.message.appIndex;

      const state = await getGlobalState(algod, appIndex);

      return state.revoked === 0;
    }
  } catch (ignore) {}

  return false;
};

export type SaveSBTParams<T = any> = {
  sbt: SBT<T>;
  assetName: string;
};

export const saveSBT = async <T = any>(
  algod: Algodv2,
  { sbt, assetName }: SaveSBTParams<T>,
  secretKey: Uint8Array
) => {
  if (Buffer.from(assetName).length > 32) {
    throw new Error(`Max size of assetName is 32 bytes`);
  }

  const from = sbt.message.holderAddress;
  const message = encryptBySecretKey(encodeObj(sbt), secretKey);

  const assetIndex = await createAsset(algod, { from, assetName }, secretKey);
  await saveMessage(algod, { from, message, assetIndex }, secretKey);
  await removeClawback(algod, { from, assetIndex }, secretKey);

  return assetIndex;
};

export const loadSBT = async <T = any>(
  indexer: algosdk.Indexer,
  assetIndex: number,
  secretKey: Uint8Array
) => {
  const encryptSbt = await loadMessage(indexer, assetIndex);
  const encodedSbt = decryptBySecretKey(encryptSbt, secretKey);

  return decodeObj(encodedSbt) as SBT<T>;
};
