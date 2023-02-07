import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { TaxVCType } from '@/lib/types/mockApp';

export const taxVCListState = atom<TaxVCType[]>({
    key: 'taxVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
