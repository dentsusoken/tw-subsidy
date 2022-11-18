import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import corVCState from '@/lib/states/corVCState';
import corVPState from '@/lib/states/corVPState';

import { CORVPContent } from '@/lib/types';

import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import { createVerifiableMessage } from '@/lib/algosbt';
import {
  holderDidAccount,
  verifierDidAccount,
  holderPw,
} from '@/lib/algo/account/accounts';
import { VerifiableCredential } from '@/lib/algosbt/types';

const createVPContent = (vc: VerifiableCredential) => {
  const content: CORVPContent = {
    credentials: [vc],
  };

  return content;
};
const createVPMessage = (content: CORVPContent) => {
  return createVerifiableMessage(
    holderDidAccount,
    verifierDidAccount.did,
    content,
    holderPw
  );
};

const useVPSubmitMain = () => {
  const [vpSubmitted, setVPSubmitted] = useState(false);
  const [vm, setVM] = useState('');
  const [vcGlobal] = useRecoilState(corVCState);
  const [vpGlobal, setVPGlobal] = useRecoilState(corVPState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVPSubmitted(!!vpGlobal);

      if (!vm && vcGlobal) {
        const content = createVPContent(shortenVerifiableMessage(vcGlobal));
        const vmForDisplay = shortenVerifiableMessage(createVPMessage(content));

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [vcGlobal, vpGlobal, vm, errorHandler]);

  const onVPSubmitClickHandler = () => {
    try {
      if (!vpGlobal && vcGlobal) {
        const content = createVPContent(vcGlobal);
        const vm = createVPMessage(content);
        setVPGlobal(vm);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    vm,
    onVPSubmitClickHandler,
    vpSubmitted,
  };
};

export default useVPSubmitMain;
