import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import { createVerifiableMessage } from '@/lib/algosbt';
import { CORVCRequestContent } from '@/lib/types';

import {
  holderDidAccount,
  issuerDidAccount,
  holderPw,
} from '@/lib/algo/account/accounts';
import corVCRequestState from '@/lib/states/corVCRequestState';
import shotrenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';

const createCORVCRequestMessage = () => {
  const content: CORVCRequestContent = {
    purpose: '住民票の発行依頼',
    address: '東京都港区',
    name: 'ISID',
  };

  return createVerifiableMessage(
    holderDidAccount,
    issuerDidAccount.did,
    content,
    holderPw
  );
};

const useVCRequestMain = () => {
  const [vm, setVM] = useState('');
  const [vcRequested, setVCRequested] = useState(false);
  const [vcRequestGlobal, setVCRequestGlobal] =
    useRecoilState(corVCRequestState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVCRequested(!!vcRequestGlobal);

      const vm = createCORVCRequestMessage();
      const vmForDisplay = shotrenVerifiableMessage(vm);

      setVM(JSON.stringify(vmForDisplay, undefined, 2));
    } catch (e) {
      errorHandler(e);
    }
  }, [vcRequestGlobal, errorHandler]);

  const onVCRequestClickHandler = () => {
    try {
      if (!vcRequestGlobal) {
        const vm = createCORVCRequestMessage();

        setVCRequestGlobal(vm);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    vm,
    onVCRequestClickHandler,
    vcRequested,
  };
};

export default useVCRequestMain;
