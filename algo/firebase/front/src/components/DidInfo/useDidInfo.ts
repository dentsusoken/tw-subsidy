import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import { getAlgod } from '@/lib/algo/algod/algods';
import getAlgoBlance from '@/lib/algo/api/getAlgoBlance';
import * as didUtils from '@/lib/algosbt/utils/didUtils';
import chainState from '@/lib/states/chainState';
import formatBigint from '@/lib/utils/formatBigint';
import { DidAccount } from '@/lib/algosbt/types';

export type UseDidInfoParams = {
  name: string;
  didAccount: DidAccount;
};

const useDidInfo = ({ name, didAccount }: UseDidInfoParams) => {
  const chainType = useRecoilValue(chainState);
  const [balance, setBalance] = useState('');
  const errorHandler = useErrorHandler();

  useEffect(() => {
    const func = async () => {
      const algod = getAlgod(chainType);

      const balance = await getAlgoBlance(algod, didAccount.address);

      setBalance(formatBigint(balance));
    };

    func().catch(errorHandler);
  }, [didAccount, errorHandler, chainType]);

  return {
    name,
    did: didUtils.shortenDid(didAccount.did),
    balance,
  };
};

export default useDidInfo;
