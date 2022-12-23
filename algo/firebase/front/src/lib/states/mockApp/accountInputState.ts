import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import persistAtom from '../persistAtom';

export const accountInputState = atom<AccountInputFormType>({
  key: 'AccountInputState',
  default: {
    id: 0,
    bankCode: '',
    branchNumber: '',
    accountNumber: '',
    corporateName: '',
    applicantName: '',
    applicantAddress: '',
    applicationDate: undefined,
    verifyStatus: undefined,
    approvalStatus: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});
