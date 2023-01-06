import { atom } from 'recoil';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const subsidyListState = atom<SubsidyInputFormType[]>({
  key: 'subsidyListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
