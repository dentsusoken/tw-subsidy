import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import { getAlgod } from '@/lib/algo/algod/algods';

import chainState from '@/lib/states/chainState';
import corVCState from '@/lib/states/corVCState';
import corVCRequestState from '@/lib/states/corVCRequestState';
import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import {
  createVerifiableCredential,
  createVerifiableMessage,
} from '@/lib/algosbt';
import { CORVCContent, CORVCRequestContent } from '@/lib/types';

import {
  issuerDidAccount,
  holderDidAccount,
  issuerPw,
} from '@/lib/algo/account/accounts';

const createVCContent = (vcRequestContent: CORVCRequestContent) => {
  const content: CORVCContent = {
    issueDate: new Date().toISOString(),
    address: vcRequestContent.address,
    name: vcRequestContent.name,
  };

  return content;
};

const useSimpleDemoStep3Main = () => {
  const [vcIssued, setVCIssued] = useState(false);
  const [vcIssuing, setVCIssuing] = useState(false);
  const [vm, setVM] = useState('');
  const [issueTimestamp, setIssueTimestamp] = useState(0);

  const [chainType] = useRecoilState(chainState);
  const [vcRequestGlobal] = useRecoilState(corVCRequestState);
  const [vcGlobal, setVCGlobal] = useRecoilState(corVCState);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVCIssued(!!vcGlobal);

      if (vcIssuing && !!vcGlobal) {
        setVCIssuing(false);
      }

      if (vcRequestGlobal && !vm) {
        const content = createVCContent(vcRequestGlobal.message.content);
        const vm = createVerifiableMessage(
          issuerDidAccount,
          holderDidAccount.did,
          content,
          issuerPw
        );
        const vmForDisplay = shortenVerifiableMessage(vm);

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [vcGlobal, vcRequestGlobal, vcIssuing, vm, errorHandler]);

  const onVCIssueClickHandler = () => {
    if (!vcGlobal && vcRequestGlobal) {
      setVCIssuing(true);

      const func = async () => {
        const content = createVCContent(vcRequestGlobal.message.content);
        const algod = getAlgod(chainType);
        const vc = await createVerifiableCredential(
          algod,
          issuerDidAccount,
          holderDidAccount.did,
          content,
          issuerPw
        );

        setVCGlobal(vc);
        setIssueTimestamp(new Date().getTime());
      };

      func().catch(errorHandler);
    }
  };

  return {
    vm,
    onVCIssueClickHandler,
    vcIssued,
    vcIssuing,
    issueTimestamp,
  };
};

export default useSimpleDemoStep3Main;
