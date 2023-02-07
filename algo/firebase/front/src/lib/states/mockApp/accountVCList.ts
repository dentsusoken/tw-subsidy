import { atom } from 'recoil';
import persistAtom from '../persistAtom';
import { AccountVCType } from '@/lib/types/mockApp';

export const accountVCListState = atom<AccountVCType[]>({
    key: 'accountVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
