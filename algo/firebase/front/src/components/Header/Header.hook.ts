import {
  holderDidAccount,
  issuerDidAccount,
  verifierDidAccount,
} from '@/lib/algo/account/accounts';

import * as didUtils from '@/lib/algosbt/utils/didUtils';

const useHeaderHook = () => {
  const holderDid = didUtils.shortenDid(holderDidAccount.did);
  const issuerDid = didUtils.shortenDid(issuerDidAccount.did);
  const verifierDid = didUtils.shortenDid(verifierDidAccount.did);

  return { holderDid, issuerDid, verifierDid };
};

export default useHeaderHook;
