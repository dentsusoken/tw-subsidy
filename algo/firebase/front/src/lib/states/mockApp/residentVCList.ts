import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const residentVCListState = atom<VerifiableMessage<VerifiableCredentialContent<ResidentInputFormType>>[]>({
    key: 'residentVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
