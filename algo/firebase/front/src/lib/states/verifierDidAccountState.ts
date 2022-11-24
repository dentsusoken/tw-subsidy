import { atom } from 'recoil';
import { DidAccount } from '@/lib/algosbt/types';
import { verifierDidAccount } from '../algo/account/accounts';

import persistAtom from './persistAtom';

const verifierDidAccountState = atom<DidAccount | undefined>({
  key: 'VerifierDidAccountState',
  default: verifierDidAccount,
  effects_UNSTABLE: [persistAtom],
});

export default verifierDidAccountState;
