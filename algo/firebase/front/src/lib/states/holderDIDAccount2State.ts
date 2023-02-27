import { atom } from 'recoil';

import persistAtom from './persistAtom';

const holderEncryptSecretKeyState = atom<string | undefined>({
  key: 'HolderEncryptSecretKeyState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default holderEncryptSecretKeyState;
