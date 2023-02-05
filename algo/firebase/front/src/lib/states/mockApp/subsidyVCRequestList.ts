import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { SubsidyVCRequestType } from '@/lib/types/mockApp';

export const subsidyVCRequestListState = atom<SubsidyVCRequestType[]>({
    key: 'subsidyVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
