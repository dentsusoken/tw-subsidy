import { generateAccount } from 'algosdk';

import { DID } from './types';
import { idFromAddress } from './utils/didUtils';
import { seedFromSecretKey } from './utils/naclUtils';
import { encryptSeed } from './utils/cryptUtils';

export const createDid = (password: string): DID => {
  const account = generateAccount();
  const id = idFromAddress(account.addr);
  const seed = seedFromSecretKey(account.sk);
  const encSeed = encryptSeed(seed, password);

  return { id, encSeed };
};
