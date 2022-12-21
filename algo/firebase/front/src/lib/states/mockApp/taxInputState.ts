import { atom } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const taxInputState = atom<TaxInputFormType>({
    key: 'taxInputState',
    default: {
        id: 0,
        applicationYear: "", 
        corporationName: "", 
        corporationAddress: "", 
        fullName: "",
        address: "",
        applicationDate: "", 
        verifyStatus: false, 
        approvalStatus: false, 
    },
    effects_UNSTABLE: [persistAtom],
});
