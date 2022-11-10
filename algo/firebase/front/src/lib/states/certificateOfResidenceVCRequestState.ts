import { atom } from 'recoil';
import { CertificateOfResidenceVCRequest } from '@/lib/types';
import persistAtom from './persistAtom';

const certificateOfResidenceVCRequestState =
  atom<CertificateOfResidenceVCRequest>({
    key: 'CertificateOfResidenceVCRequestState',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
  });

export default certificateOfResidenceVCRequestState;
