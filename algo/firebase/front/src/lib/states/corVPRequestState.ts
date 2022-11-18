import { atom } from 'recoil';
import { CORVPRequest } from '@/lib/types';
import persistAtom from './persistAtom';

const certificateOfResidenceVPRequestState = atom<CORVPRequest | undefined>({
  key: 'CertificateOfResidenceVPRequestState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default certificateOfResidenceVPRequestState;
