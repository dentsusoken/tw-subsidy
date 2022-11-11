import { atom } from 'recoil';
import persistAtom from './persistAtom';

const certificateOfResidenceVCRequestVerifiedState = atom<boolean>({
  key: 'CertificateOfResidenceVCRequestVerifiedState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default certificateOfResidenceVCRequestVerifiedState;
