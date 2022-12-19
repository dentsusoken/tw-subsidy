import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import persistAtom from '../persistAtom';

export const residentInputState = atom<ResidentInputFormType>({
  key: 'ResidentInputState',
  default: {
    id: 0,
    fullName: '',
    fullNameFurigana: '',
    address: '',
    addressRegistDate: '',
    permanentAddress: '',
    applicationDate: undefined,
    verifyStatus: undefined,
    approvalStatus: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});
