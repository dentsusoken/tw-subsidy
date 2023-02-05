import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';
import { ResidentVCRequestType } from '@/lib/types/mockApp';

export const residentVCRequestListState = atom<ResidentVCRequestType[]>({
    key: 'residentVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
