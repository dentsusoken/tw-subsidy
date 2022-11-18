import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import corVPRequestState from '@/lib/states/corVPRequestState';

import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import { createVerifiableMessage } from '@/lib/algosbt';
import {
  holderDidAccount,
  verifierDidAccount,
  verifierPw,
} from '@/lib/algo/account/accounts';

const content = {
  purpose: '住民票の提出依頼',
};

const createVPRequestMessage = () => {
  return createVerifiableMessage(
    verifierDidAccount,
    holderDidAccount.did,
    content,
    verifierPw
  );
};

const useVPRequestMain = () => {
  const [vpRequested, setVPRequested] = useState(false);
  const [vm, setVM] = useState('');
  const [vpRequestGlobal, setVPRequestGlobal] =
    useRecoilState(corVPRequestState);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVPRequested(!!vpRequestGlobal);

      if (!vm) {
        const vmForDisplay = shortenVerifiableMessage(createVPRequestMessage());

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [vpRequestGlobal, vm, errorHandler]);

  const onVPRequestClickHandler = () => {
    try {
      if (!vpRequestGlobal) {
        const vm = createVPRequestMessage();
        setVPRequestGlobal(vm);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    vm,
    onVPRequestClickHandler,
    vpRequested,
  };
};

export default useVPRequestMain;
