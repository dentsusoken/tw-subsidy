import { atom } from 'recoil';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const subsidyInputState = atom<SubsidyInputFormType>({
    key: 'subsidyInputState',
    default: {
        id: 0,
        residentVC: "0",
        accountVC: "0",
        taxVC: "0",
        fullName: "",
        address: "",
        applicationDate: "",
        verifyStatus: false,
        approvalStatus: false,
        residentVP: undefined,
        accountVP: undefined,
        taxVP: undefined
    },
    effects_UNSTABLE: [persistAtom],
});
