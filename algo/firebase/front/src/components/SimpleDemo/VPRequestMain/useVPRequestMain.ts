import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import corVPRequestState from '@/lib/states/corVPRequestState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import verifierDidAccountState from '@/lib/states/verifierDidAccountState';

import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import { createVerifiableMessage } from '@/lib/algosbt';
import { verifierPw } from '@/lib/algo/account/accounts';
import { DidAccount } from '@/lib/algosbt/types';

const content = {
  purpose: '住民票の提出依頼',
};

const createVPRequestMessage = (
  verifierDidAccount: DidAccount,
  holderDid: string
) => {
  return createVerifiableMessage(
    verifierDidAccount,
    holderDid,
    content,
    verifierPw
  );
};

const useVPRequestMain = () => {
  const [vpRequested, setVPRequested] = useState(false);
  const [vm, setVM] = useState('');
  const [holderDidAccount, setHolderDidAccount] = useState<DidAccount>();
  const [verifierDidAccount, setVerifierDidAccount] = useState<DidAccount>();

  const [vpRequestGlobal, setVPRequestGlobal] =
    useRecoilState(corVPRequestState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [verifierDidAccountGlobal] = useRecoilState(verifierDidAccountState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVPRequested(!!vpRequestGlobal);
      setHolderDidAccount(holderDidAccountGlobal);
      setVerifierDidAccount(verifierDidAccountGlobal);

      if (!vm && verifierDidAccountGlobal && holderDidAccountGlobal) {
        const vmForDisplay = shortenVerifiableMessage(
          createVPRequestMessage(
            verifierDidAccountGlobal,
            holderDidAccountGlobal.did
          )
        );

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [
    vpRequestGlobal,
    vm,
    verifierDidAccountGlobal,
    holderDidAccountGlobal,
    errorHandler,
  ]);

  const onVPRequestClickHandler = () => {
    try {
      if (
        !vpRequestGlobal &&
        verifierDidAccountGlobal &&
        holderDidAccountGlobal
      ) {
        const vm = createVPRequestMessage(
          verifierDidAccountGlobal,
          holderDidAccountGlobal.did
        );
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
    holderDidAccount,
    verifierDidAccount,
  };
};

export default useVPRequestMain;
