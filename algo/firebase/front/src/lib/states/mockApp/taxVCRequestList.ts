import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { TaxVCRequestType } from '@/lib/types/mockApp';

export const taxVCRequestListState = atom<TaxVCRequestType[]>({
    key: 'taxVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
