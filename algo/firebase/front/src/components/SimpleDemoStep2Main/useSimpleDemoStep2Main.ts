import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import certificateOfResidenceVCRequestVerifiedState from '@/lib/states/certificateOfResidenceVCRequestVerifiedState';
import certificateOfResidenceVCRequestState from '@/lib/states/certificateOfResidenceVCRequestState';
import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import { verifyVerifiableMessage } from '@/lib/algosbt';

const useSimpleDemoStep2Main = () => {
  const [vcRequestVerified, setVCRequestVerified] = useState(false);
  const [vm, setVM] = useState('');
  const [vcRequestVerifiedGlobal, setVCRequestVerifiedGlobal] = useRecoilState(
    certificateOfResidenceVCRequestVerifiedState
  );
  const [vcRequestGlobal] = useRecoilState(
    certificateOfResidenceVCRequestState
  );

  useEffect(() => {
    setVCRequestVerified(vcRequestVerifiedGlobal);

    if (vcRequestGlobal) {
      const vmForDisplay = shortenVerifiableMessage(vcRequestGlobal);

      setVM(JSON.stringify(vmForDisplay, undefined, 2));
    }
  }, [vcRequestVerified, vcRequestVerifiedGlobal, vcRequestGlobal]);

  const onVCRequestVerifiedClickHandler = () => {
    if (vcRequestGlobal) {
      setVCRequestVerifiedGlobal(verifyVerifiableMessage(vcRequestGlobal));
    }
  };

  return {
    vm,
    onVCRequestVerifiedClickHandler,
    vcRequestVerified,
  };
};

export default useSimpleDemoStep2Main;
