import { atom } from 'recoil';
import persistAtom from '../persistAtom';
import { ResidentVCRequestType } from '@/lib/types/mockApp';

export const residentVCRequestListState = atom<ResidentVCRequestType[]>({
    key: 'residentVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
