import { encodeAddress } from 'algosdk';

import { keyPairFromSeed } from './naclUtils';

export const accountFromSeed = (seed: Uint8Array) => {
  const keys = keyPairFromSeed(seed);
  const addr = encodeAddress(keys.publicKey);
  return { addr, sk: keys.secretKey };
};
