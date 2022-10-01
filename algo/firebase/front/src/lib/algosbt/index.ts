import { generateAccount, decodeAddress, encodeObj } from 'algosdk';

import { EncAccount, SBTRequest, SBT } from './types';
import { encryptByPassword, decryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { sign, verify } from './utils/naclUtils';

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

  return { holderAddress, message, signature };
};

export const verifySBTRequest = (req: SBTRequest<unknown>) => {
  const { publicKey } = decodeAddress(req.holderAddress);
  const encodedMessage = encodeObj(req.message);

  return verify(encodedMessage, req.signature, publicKey);
};

export const createSBT = <T>(
  holderAddress: string,
  issuerAddress: string,
  message: T,
  secretKey: Uint8Array
): SBT<T> => {
  const encodedMessage = encodeObj(message);
  const signature = sign(encodedMessage, secretKey);

  return { holderAddress, issuerAddress, message, signature };
};

export const verifySBT = (sbt: SBT<unknown>) => {
  const { publicKey } = decodeAddress(sbt.issuerAddress);
  const encodedMessage = encodeObj(sbt.message);

  return verify(encodedMessage, sbt.signature, publicKey);
};
