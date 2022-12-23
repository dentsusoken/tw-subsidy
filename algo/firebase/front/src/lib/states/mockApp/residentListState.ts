import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import persistAtom from '../persistAtom';

export const residentListState = atom<ResidentInputFormType[]>({
  key: 'ResidentListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
