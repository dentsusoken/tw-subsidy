import { atom } from 'recoil';

import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const residentVCRequestListState = atom<VerifiableMessage<ResidentInputFormType>[]>({
    key: 'residentVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
