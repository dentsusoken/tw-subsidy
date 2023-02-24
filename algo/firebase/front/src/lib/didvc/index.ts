import * as u8a from 'uint8arrays';
import * as algosdk from 'algosdk';

import * as cryptUtils from '../utils/cryptUtils';
import getGlobalState from '../algo/api/getGlobalState';

export const encryptSecretKey = (
  secretKey: Uint8Array,
  password: string
): string => {
  const encryptBytes = cryptUtils.encryptByPassword(secretKey, password);

  return u8a.toString(encryptBytes, 'base64url');
};

export const decryptSecretKey = (
  encryptSecretKey: string,
  password: string
): Uint8Array => {
  const encryptBytes = u8a.fromString(encryptSecretKey, 'base64url');

  return cryptUtils.decryptByPassword(encryptBytes, password);
};

export { default as createRevokedApp } from '../algo/api/createRevokedApp';

export { default as setRevoked } from '../algo/api/setRevoked';

export const verifyCredentialStatus = async (
  algod: algosdk.Algodv2,
  appIndex: number
): Promise<boolean> => {
  const state = await getGlobalState(algod, appIndex);

  return state.revoked === 0;
};
