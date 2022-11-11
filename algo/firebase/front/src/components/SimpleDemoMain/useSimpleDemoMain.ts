import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import certificateOfResidenceVCRequestState from '@/lib/states/certificateOfResidenceVCRequestState';
import certificateOfResidenceVCRequestVerifiedState from '@/lib/states/certificateOfResidenceVCRequestVerifiedState';
import { CertificateOfResidenceVCRequest } from '@/lib/types';

const useSimpleDemoMain = () => {
  const [vcRequest, setVCRequest] = useState<CertificateOfResidenceVCRequest>();
  const [vcRequestGlobal, setVCRequestGlobal] = useRecoilState(
    certificateOfResidenceVCRequestState
  );
  const setVCRequestVerifiedGlobal = useSetRecoilState(
    certificateOfResidenceVCRequestVerifiedState
  );

  useEffect(() => {
    setVCRequest(vcRequestGlobal);
  }, [vcRequest, vcRequestGlobal]);

  const onClearClickHandler = () => {
    setVCRequestGlobal(undefined);
    setVCRequestVerifiedGlobal(false);
  };

  return { step1Done: vcRequest !== undefined, onClearClickHandler };
};

export default useSimpleDemoMain;
