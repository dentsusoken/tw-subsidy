import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import corVPState from '@/lib/states/corVPState';
import corVPVerifiedState from '@/lib/states/corVPVerifiedState';
import chainState from '@/lib/states/chainState';

import { getAlgod } from '@/lib/algo/algod/algods';

import shortenVerifiablePresentation from '@/lib/utils/shortenVerifiablePresentation';
import { verifyVerifiablePresentation } from '@/lib/algosbt';

const useVPVerifyMain = () => {
  const [vpVerified, setVPVerified] = useState(false);
  const [vm, setVM] = useState('');
  const [vpGlobal] = useRecoilState(corVPState);
  const [vpVerifiedGlobal, setVPVerifiedGlobal] =
    useRecoilState(corVPVerifiedState);
  const [chain] = useRecoilState(chainState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVPVerified(vpVerifiedGlobal);

      if (!vm && vpGlobal) {
        const vmForDisplay = shortenVerifiablePresentation(vpGlobal);

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [vpGlobal, vpVerifiedGlobal, vm, errorHandler]);

  const onVPVerifyClickHandler = async () => {
    try {
      if (!vpVerifiedGlobal && vpGlobal) {
        const algod = getAlgod(chain);
        setVPVerifiedGlobal(
          await verifyVerifiablePresentation(algod, vpGlobal)
        );
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    vm,
    onVPVerifyClickHandler,
    vpVerified,
  };
};

export default useVPVerifyMain;
