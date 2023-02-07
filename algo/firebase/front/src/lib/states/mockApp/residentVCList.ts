import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { ResidentVCType } from '@/lib/types/mockApp';

export const residentVCListState = atom<ResidentVCType[]>({
    key: 'residentVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
