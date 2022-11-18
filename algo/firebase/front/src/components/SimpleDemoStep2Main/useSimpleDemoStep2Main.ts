import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

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
  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVCRequestVerified(vcRequestVerifiedGlobal);

      if (vcRequestGlobal) {
        const vmForDisplay = shortenVerifiableMessage(vcRequestGlobal);

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [
    vcRequestVerified,
    vcRequestVerifiedGlobal,
    vcRequestGlobal,
    errorHandler,
  ]);

  const onVCRequestVerifiedClickHandler = () => {
    try {
      if (vcRequestGlobal) {
        setVCRequestVerifiedGlobal(verifyVerifiableMessage(vcRequestGlobal));
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    vm,
    onVCRequestVerifiedClickHandler,
    vcRequestVerified,
  };
};

export default useSimpleDemoStep2Main;
