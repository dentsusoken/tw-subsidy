import { atom } from 'recoil';
import persistAtom from './persistAtom';

const certificateOfResidenceVPVerifiedState = atom<boolean>({
  key: 'CertificateOfResidenceVPVerifiedState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default certificateOfResidenceVPVerifiedState;
