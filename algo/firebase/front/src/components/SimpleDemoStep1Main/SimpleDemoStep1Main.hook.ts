import { createVerifiableMessage } from '@/lib/algosbt';

import {
  holderDidAccount,
  issuerDidAccount,
  holderPw,
} from '@/lib/algo/account/accounts';
import { shortenDid } from '@/lib/algosbt/utils/didUtils';

const useSimpleDemoStep1MainHook = () => {
  const content = {
    purpose: '住民票の発行依頼',
    address: '東京都港区',
    name: 'ISID',
  };
  const vm = createVerifiableMessage(
    holderDidAccount,
    issuerDidAccount.did,
    content,
    holderPw
  );

  const vmForDisplay = JSON.parse(JSON.stringify(vm));

  vmForDisplay.message.senderDid = shortenDid(vm.message.senderDid);
  vmForDisplay.message.receiverDid = shortenDid(vm.message.receiverDid);
  vmForDisplay.signature = Buffer.from(vm.signature).toString('base64');

  return { vm: JSON.stringify(vmForDisplay, undefined, 2) };
};

export default useSimpleDemoStep1MainHook;
