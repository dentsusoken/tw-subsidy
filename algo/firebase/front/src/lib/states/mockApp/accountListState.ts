import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import persistAtom from '../persistAtom';

export const accountListState = atom<AccountInputFormType[]>({
  key: 'AccountListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
