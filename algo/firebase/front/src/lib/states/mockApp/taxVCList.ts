import { atom } from 'recoil';

import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';
import { TaxVCType } from '@/lib/types/mockApp';

export const taxVCListState = atom<TaxVCType[]>({
    key: 'taxVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
