import { atom } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { VerifiableMessage } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const taxVCRequestListState = atom<VerifiableMessage<TaxInputFormType>[]>({
    key: 'taxVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
