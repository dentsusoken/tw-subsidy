import { atom } from 'recoil';

import persistAtom from './persistAtom';

const verifierEncryptSecretKeyState = atom<string | undefined>({
  key: 'VerifierEncryptSecretKeyState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default verifierEncryptSecretKeyState;
