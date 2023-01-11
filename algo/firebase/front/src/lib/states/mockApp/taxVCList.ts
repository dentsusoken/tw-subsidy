import { atom } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const taxVCListState = atom<VerifiableMessage<VerifiableCredentialContent<TaxInputFormType>>[]>({
    key: 'taxVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
