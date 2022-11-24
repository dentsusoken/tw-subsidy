import { atom } from 'recoil';
import { DidAccount } from '@/lib/algosbt/types';
import { issuerDidAccount } from '../algo/account/accounts';

import persistAtom from './persistAtom';

const issuerDidAccountState = atom<DidAccount | undefined>({
  key: 'IssuerDidAccountState',
  default: issuerDidAccount,
  effects_UNSTABLE: [persistAtom],
});

export default issuerDidAccountState;
