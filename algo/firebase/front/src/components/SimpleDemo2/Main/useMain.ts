import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import { getIndexer } from '@/lib/algo/indexer/indexers';
import { getAlgod } from '@/lib/algo/algod/algods';

import chainState from '@/lib/states/chainState';
import accountsPreparedState from '@/lib/states/accountsPreparedState';
import corVCRequestState from '@/lib/states/corVCRequestState';
import corVCState from '@/lib/states/corVCState';
import corVPState from '@/lib/states/corVPState';
import corVPVerifiedState from '@/lib/states/corVPVerifiedState';
import issuerEncryptSecretKeyState from '@/lib/states/issuerEncryptSecretKeyState';
import * as didvc from '@/lib/didvc';

import { issuerPw } from '@/lib/algo/account/accounts';

const useMain = () => {
  const [accountsPrepared, setAccountsPrepared] = useState(false);
  const [vcRequested, setVCRequested] = useState(false);
  const [vcIssued, setVCIssued] = useState(false);
  const [vpSubmitted, setVPSubmitted] = useState(false);
  const [vpVerified, setVPVerified] = useState(false);
  const [clearing, setClearing] = useState(false);

  const [accountsPreparedGlobal] = useRecoilState(accountsPreparedState);
  const [vcRequestGlobal, setVCRequestGlobal] =
    useRecoilState(corVCRequestState);
  const [vcGlobal, setVCGlobal] = useRecoilState(corVCState);
  const [vpGlobal, setVPGlobal] = useRecoilState(corVPState);
  const [vpVerifiedGlobal, setVPVerifiedGlobal] =
    useRecoilState(corVPVerifiedState);
  const [issuerEncryptSecretKey] = useRecoilState(issuerEncryptSecretKeyState);
  const [chainType] = useRecoilState(chainState);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    setAccountsPrepared(accountsPreparedGlobal);
    setVCRequested(!!vcRequestGlobal);
    setVCIssued(!!vcGlobal);
    setVPSubmitted(!!vpGlobal);
    setVPVerified(vpVerifiedGlobal);
  }, [
    accountsPreparedGlobal,
    vcRequestGlobal,
    vcGlobal,
    vpGlobal,
    vpVerifiedGlobal,
  ]);

  const onClearClickHandler = () => {
    setVCRequestGlobal(undefined);
    setVCGlobal(undefined);
    setVPGlobal(undefined);
    setVPVerifiedGlobal(false);

    if (clearing) {
      return;
    }

    if (!issuerEncryptSecretKey) {
      return;
    }

    const func = async () => {
      setClearing(true);

      const indexer = getIndexer(chainType);
      const algod = getAlgod(chainType);

      await didvc.deleteAllApps(
        indexer,
        algod,
        issuerEncryptSecretKey,
        issuerPw
      );

      setClearing(false);
    };

    func().catch(errorHandler);
  };

  return {
    accountsPrepared,
    vcRequested,
    vcIssued,
    vpSubmitted,
    vpVerified,
    clearing,
    onClearClickHandler,
  };
};

export default useMain;
