import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';
import { ResidentVCType } from '@/lib/types/mockApp';

export const residentVCListState = atom<ResidentVCType[]>({
    key: 'residentVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
