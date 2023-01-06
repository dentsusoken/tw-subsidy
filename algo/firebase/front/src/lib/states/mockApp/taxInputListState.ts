import { atom } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const taxInputListState = atom<TaxInputFormType[]>({
    key: 'taxInputListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
