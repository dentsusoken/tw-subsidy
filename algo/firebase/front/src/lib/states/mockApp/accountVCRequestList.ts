import { atom } from 'recoil';

import persistAtom from '../persistAtom';
import { AccountVCRequestType } from '@/lib/types/mockApp';

export const accountVCRequestListState = atom<AccountVCRequestType[]>({
    key: 'accountVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
