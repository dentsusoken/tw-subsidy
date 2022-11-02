import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  holderDidAccount,
  issuerDidAccount,
  verifierDidAccount,
} from '@/lib/algo/account/accounts';
import { getAlgod } from '@/lib/algo/algod/algods';
import getAlgoBlance from '@/lib/algo/api/getAlgoBlance';
import * as didUtils from '@/lib/algosbt/utils/didUtils';
import chainState from '@/lib/states/chainState';
import formatBigint from '@/lib/utils/formatBigint';

type Balances = {
  holderBalance: string;
  issuerBalance: string;
  verifierBalance: string;
};

const useHeaderHook = () => {
  const chainType = useRecoilValue(chainState);
  const algod = getAlgod(chainType);

  const holderDid = didUtils.shortenDid(holderDidAccount.did);
  const issuerDid = didUtils.shortenDid(issuerDidAccount.did);
  const verifierDid = didUtils.shortenDid(verifierDidAccount.did);
  const [balances, setBalances] = useState<Balances>({} as Balances);
  const { holderBalance, issuerBalance, verifierBalance } = balances;

  useEffect(() => {
    const func = async () => {
      const holderBalance = formatBigint(
        await getAlgoBlance(algod, holderDidAccount.address)
      );
      const issuerBalance = formatBigint(
        await getAlgoBlance(algod, issuerDidAccount.address)
      );
      const verifierBalance = formatBigint(
        await getAlgoBlance(algod, verifierDidAccount.address)
      );

      setBalances({ holderBalance, issuerBalance, verifierBalance });
    };

    func();
  });

  return {
    holderDid,
    issuerDid,
    verifierDid,
    holderBalance,
    issuerBalance,
    verifierBalance,
  };
};

export default useHeaderHook;
