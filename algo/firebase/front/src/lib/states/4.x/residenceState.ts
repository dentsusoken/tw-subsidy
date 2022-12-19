import { atom } from 'recoil';
import persistAtom from '../persistAtom';

const residenceState = atom<boolean>({
  key: 'residenceState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default residenceState;
