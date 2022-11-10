import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import certificateOfResidenceVCRequestState from '@/lib/states/certificateOfResidenceVCRequestState';
import { CertificateOfResidenceVCRequest } from '@/lib/types';

const useSimpleDemoMain = () => {
  const [vcRequest, setVCRequest] = useState<CertificateOfResidenceVCRequest>();
  const [vcRequestGlobal] = useRecoilState(
    certificateOfResidenceVCRequestState
  );

  useEffect(() => {
    setVCRequest(vcRequestGlobal);
  }, [vcRequest, vcRequestGlobal]);

  return { step1Done: vcRequest !== undefined };
};

export default useSimpleDemoMain;
