import { atom } from 'recoil';
import { CertificateOfResidenceVC } from '@/lib/types';
import persistAtom from './persistAtom';

const certificateOfResidenceVCState = atom<
  CertificateOfResidenceVC | undefined
>({
  key: 'CertificateOfResidenceVCState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default certificateOfResidenceVCState;
