import { atom } from 'recoil';

import persistAtom from '../persistAtom';

export const dataVerState = atom<number>({
    key: 'dataVerState',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});
