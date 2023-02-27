import { atom } from 'recoil';

import persistAtom from './persistAtom';

const issuerEncryptSecretKeyState = atom<string | undefined>({
  key: 'IssuerEncryptSecretKeyState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default issuerEncryptSecretKeyState;
