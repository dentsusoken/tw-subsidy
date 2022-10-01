import { encodeAddress } from 'algosdk';

import { publicKeyFromSecretKey } from './naclUtils';

export const addressFromSecretKey = (secretKey: Uint8Array) => {
  const publicKey = publicKeyFromSecretKey(secretKey);

  return encodeAddress(publicKey);
};
