import { useEffect, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { useErrorHandler } from 'react-error-boundary';

import * as didJwtKit from 'did-jwt-toolkit';

import { holderPw, issuerPw, verifierPw } from '@/lib/algo/account/accounts';

import { getAlgod } from '@/lib/algo/algod/algods';
import getAlgoBalance from '@/lib/algo/api/getAlgoBalance';
import addressFromSecretKey from '@/lib/algo/utils/addressFromSecretKey';
import { decryptSecretKey, encryptSecretKey } from '@/lib/didvc';

import holderEncryptSecretKeyState from '@/lib/states/holderEncryptSecretKeyState';
import verifierEncryptSecretKeyState from '@/lib/states/verifierEncryptSecretKeyState';
import issuerEncryptSecretKeyState from '@/lib/states/issuerEncryptSecretKeyState';
import accountsPreparedState from '@/lib/states/accountsPreparedState';
import chainState from '@/lib/states/chainState';

import * as didvc from '@/lib/didvc';

const driver = didJwtKit.getDIDKeyDriver('EdDSA');

const useAccountsMain = () => {
  const [accountsPrepared, setAccountsPrepared] = useState(false);
  const [holderEncryptSecretKey, setHolderEncryptSecretKey] =
    useState<string>();
  const [verifierEncryptSecretKey, setVerifierEncryptSecretKey] =
    useState<string>();
  const [issuerEncryptSecretKey, setIssuerEncryptSecretKey] =
    useState<string>();
  const [timestamp, setTimestamp] = useState(0);

  const [holderEncryptSecretkeyGlobal, setHolderEncryptSecretKeyGlobal] =
    useRecoilState(holderEncryptSecretKeyState);
  const [verifierEncryptSecretKeyGlobal, setVerifierEncryptSecretKeyGlobal] =
    useRecoilState(verifierEncryptSecretKeyState);
  const [issuerEncryptSecretKeyGlobal, setIssuerEncryptSecretKeyGlobal] =
    useRecoilState(issuerEncryptSecretKeyState);
  const [accountsPreparedGlobal, setAccountsPreparedGlobal] = useRecoilState(
    accountsPreparedState
  );
  const [chainType] = useRecoilState(chainState);

  const errorHandler = useErrorHandler();

  const checkIssuerBalance = useCallback(async () => {
    if (
      !holderEncryptSecretkeyGlobal ||
      !issuerEncryptSecretKeyGlobal ||
      !verifierEncryptSecretKeyGlobal
    ) {
      return;
    }

    const algod = getAlgod(chainType);
    const issuerSecretKey = decryptSecretKey(
      issuerEncryptSecretKeyGlobal,
      issuerPw
    );

    const balance = Number(
      await getAlgoBalance(algod, addressFromSecretKey(issuerSecretKey))
    );

    if (balance >= 1000000) {
      setAccountsPreparedGlobal(true);
    }
  }, [
    holderEncryptSecretkeyGlobal,
    issuerEncryptSecretKeyGlobal,
    verifierEncryptSecretKeyGlobal,
    chainType,
    setAccountsPreparedGlobal,
  ]);

  useEffect(() => {
    try {
      setHolderEncryptSecretKey(holderEncryptSecretkeyGlobal);
      setIssuerEncryptSecretKey(issuerEncryptSecretKeyGlobal);
      setVerifierEncryptSecretKey(verifierEncryptSecretKeyGlobal);
      setAccountsPrepared(accountsPreparedGlobal);

      checkIssuerBalance();
    } catch (e) {
      errorHandler(e);
    }
  }, [
    holderEncryptSecretkeyGlobal,
    issuerEncryptSecretKeyGlobal,
    verifierEncryptSecretKeyGlobal,
    accountsPreparedGlobal,
    chainType,
    errorHandler,
    checkIssuerBalance,
  ]);

  const onCreateAccountsHandler = async () => {
    try {
      const holderEncryptSecretKey = didvc.createEncryptSecretKey(holderPw);
      const issuerEncryptSecretKey = didvc.createEncryptSecretKey(issuerPw);
      const verifierEncryptSecretKey = didvc.createEncryptSecretKey(verifierPw);

      setHolderEncryptSecretKeyGlobal(holderEncryptSecretKey);
      setIssuerEncryptSecretKeyGlobal(issuerEncryptSecretKey);
      setVerifierEncryptSecretKeyGlobal(verifierEncryptSecretKey);

      setAccountsPreparedGlobal(false);
    } catch (e) {
      errorHandler(e);
    }
  };

  const onCheckBalanceHandler = async () => {
    try {
      setTimestamp(new Date().getTime());

      await checkIssuerBalance();
    } catch (e) {
      errorHandler(e);
    }
  };

  const { did: holderDID, address: holderAddress } =
    didvc.didAndAddressFromEncryptSecretKey(holderEncryptSecretKey, holderPw);
  const { did: issuerDID, address: issuerAddress } =
    didvc.didAndAddressFromEncryptSecretKey(issuerEncryptSecretKey, issuerPw);
  const { did: verifierDID, address: verifierAddress } =
    didvc.didAndAddressFromEncryptSecretKey(
      verifierEncryptSecretKey,
      verifierPw
    );

  return {
    accountsPrepared,
    holderDID,
    holderAddress,
    issuerDID,
    issuerAddress,
    verifierDID,
    verifierAddress,
    timestamp,
    onCreateAccountsHandler,
    onCheckBalanceHandler,
  };
};

export default useAccountsMain;
