import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import { getAlgod } from '@/lib/algo/algod/algods';

import { DidAccount } from '@/lib/algosbt/types';

import chainState from '@/lib/states/chainState';
import corVCState from '@/lib/states/corVCState';
import corVCRequestState from '@/lib/states/corVCRequestState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import shortenVerifiableMessage from '@/lib/utils/shortenVerifiableMessage';
import {
  createVerifiableCredential,
  createVerifiableMessage,
} from '@/lib/algosbt';
import { CORVCContent, CORVCRequestContent } from '@/lib/types';

import { issuerPw } from '@/lib/algo/account/accounts';

const createVCContent = (vcRequestContent: CORVCRequestContent) => {
  const content: CORVCContent = {
    issueDate: new Date().toISOString(),
    address: vcRequestContent.address,
    name: vcRequestContent.name,
  };

  return content;
};

const useVCIssueMain = () => {
  const [vcIssued, setVCIssued] = useState(false);
  const [vcIssuing, setVCIssuing] = useState(false);
  const [vm, setVM] = useState('');
  const [issueTimestamp, setIssueTimestamp] = useState(0);
  const [holderDidAccount, setHolderDidAccount] = useState<DidAccount>();
  const [issuerDidAccount, setIssuerDidAccount] = useState<DidAccount>();

  const [chainType] = useRecoilState(chainState);
  const [vcRequestGlobal] = useRecoilState(corVCRequestState);
  const [vcGlobal, setVCGlobal] = useRecoilState(corVCState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      setVCIssued(!!vcGlobal);
      setHolderDidAccount(holderDidAccountGlobal);
      setIssuerDidAccount(issuerDidAccountGlobal);

      if (vcIssuing && !!vcGlobal) {
        setVCIssuing(false);
      }

      if (
        vcRequestGlobal &&
        !vm &&
        issuerDidAccountGlobal &&
        holderDidAccountGlobal
      ) {
        const content = createVCContent(vcRequestGlobal.message.content);
        const vm = createVerifiableMessage(
          issuerDidAccountGlobal,
          holderDidAccountGlobal.did,
          content,
          issuerPw
        );
        const vmForDisplay = shortenVerifiableMessage(vm);

        setVM(JSON.stringify(vmForDisplay, undefined, 2));
      }
    } catch (e) {
      errorHandler(e);
    }
  }, [
    vcGlobal,
    vcRequestGlobal,
    vcIssuing,
    vm,
    issuerDidAccountGlobal,
    holderDidAccountGlobal,
    errorHandler,
  ]);

  const onVCIssueClickHandler = () => {
    if (
      !vcGlobal &&
      vcRequestGlobal &&
      issuerDidAccountGlobal &&
      holderDidAccountGlobal
    ) {
      setVCIssuing(true);

      const func = async () => {
        const content = createVCContent(vcRequestGlobal.message.content);
        const algod = getAlgod(chainType);
        const vc = await createVerifiableCredential(
          algod,
          issuerDidAccountGlobal,
          holderDidAccountGlobal.did,
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
    issuerDidAccount,
    holderDidAccount,
    issueTimestamp,
  };
};

export default useVCIssueMain;
