import { atom } from 'recoil';

import { VCListType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const VCListState = atom<VCListType>({
    key: 'VCListState',
    default: {
        resident: [],
        account: [],
        tax: []
    },
    effects_UNSTABLE: [persistAtom],
});
