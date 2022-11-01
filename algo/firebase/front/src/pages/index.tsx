import type { NextPage } from 'next';

import {
  holderAccount,
  issuerAccount,
  verifierAccount,
} from '@/lib/algo/account/accounts';
import shortenAddress from '@/lib/utils/shortenAddress';

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 text-center">
        Trusted Web Subsidy
      </h1>
      <div>
        <div>Holder Address: {shortenAddress(holderAccount.addr)}</div>
        <div>Issuer Address: {shortenAddress(issuerAccount.addr)}</div>
        <div>Verifier Address: {shortenAddress(verifierAccount.addr)}</div>
      </div>
    </div>
  );
};

export default Home;
