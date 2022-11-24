import { atom } from 'recoil';
import { DidAccount } from '@/lib/algosbt/types';
import { holderDidAccount } from '../algo/account/accounts';

import persistAtom from './persistAtom';

const holderDidAccountState = atom<DidAccount | undefined>({
  key: 'HolderDidAccountState',
  default: holderDidAccount,
  effects_UNSTABLE: [persistAtom],
});

export default holderDidAccountState;
