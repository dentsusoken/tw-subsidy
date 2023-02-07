import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { SubsidyVCType } from '@/lib/types/mockApp';

export const taxVCListState = atom<SubsidyVCType[]>({
    key: 'subsidyVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
