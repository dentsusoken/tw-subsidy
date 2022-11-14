import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import certificateOfResidenceVCRequestState from '@/lib/states/certificateOfResidenceVCRequestState';
import certificateOfResidenceVCRequestVerifiedState from '@/lib/states/certificateOfResidenceVCRequestVerifiedState';
import certificateOfResidenceVCState from '@/lib/states/certificateOfResidenceVCState';

const useSimpleDemoMain = () => {
  const [step1Done, setSetp1Done] = useState(false);
  const [step2Done, setSetp2Done] = useState(false);
  const [step3Done, setSetp3Done] = useState(false);

  const [vcRequestGlobal, setVCRequestGlobal] = useRecoilState(
    certificateOfResidenceVCRequestState
  );
  const [vcRequestVerifiedGlobal, setVCRequestVerifiedGlobal] = useRecoilState(
    certificateOfResidenceVCRequestVerifiedState
  );
  const [vcGlobal, setVCGlobal] = useRecoilState(certificateOfResidenceVCState);

  useEffect(() => {
    setSetp1Done(!!vcRequestGlobal);
    setSetp2Done(vcRequestVerifiedGlobal);
    setSetp3Done(!!vcGlobal);
  }, [vcRequestGlobal, vcRequestVerifiedGlobal, vcGlobal]);

  const onClearClickHandler = () => {
    setVCRequestGlobal(undefined);
    setVCRequestVerifiedGlobal(false);
    setVCGlobal(undefined);
  };

  return {
    step1Done,
    step2Done,
    step3Done,
    onClearClickHandler,
  };
};

export default useSimpleDemoMain;
