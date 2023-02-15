import { atom } from 'recoil';
import persistAtom from './persistAtom';

import { VerifiablePresentationVerified } from '../algosbt/types';

const certificateOfResidenceVPVerifiedState = atom<
  VerifiablePresentationVerified | undefined
>({
  key: 'CertificateOfResidenceVPVerifiedState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default certificateOfResidenceVPVerifiedState;
