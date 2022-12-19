import { applicationDocsType } from '@/lib/types/4.x';
import { atom } from 'recoil';
import persistAtom from '../persistAtom';

const applicationDocsState = atom<applicationDocsType>({
  key: 'applicationDocsState',
  default: {
    isResidenceCertificate: false,
    isAccountCertificate: false,
    isTaxCertificate: false
  },
  effects_UNSTABLE: [persistAtom],
});

export default applicationDocsState;
