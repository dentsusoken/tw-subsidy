import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { createVerifiableMessage } from '@/lib/algosbt';
import {
  CertificateOfResidenceVCRequest,
  CertificateOfResidenceVCRequestContent,
} from '@/lib/types';

import {
  holderDidAccount,
  issuerDidAccount,
  holderPw,
} from '@/lib/algo/account/accounts';
import { shortenDid } from '@/lib/algosbt/utils/didUtils';
import certificateOfResidenceVCRequestState from '@/lib/states/certificateOfResidenceVCRequestState';

const createCertificateOfResidenceVCRequest = () => {
  const content: CertificateOfResidenceVCRequestContent = {
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

const useSimpleDemoStep1Main = () => {
  const [vcRequest, setVCRequest] = useState<CertificateOfResidenceVCRequest>();
  const [vcRequestGlobal, setVCRequestGlobal] = useRecoilState(
    certificateOfResidenceVCRequestState
  );

  useEffect(() => {
    setVCRequest(vcRequestGlobal);
  }, [vcRequest, vcRequestGlobal]);

  const vm = createCertificateOfResidenceVCRequest();
  const vmForDisplay = JSON.parse(JSON.stringify(vm));

  vmForDisplay.message.senderDid = shortenDid(vm.message.senderDid);
  vmForDisplay.message.receiverDid = shortenDid(vm.message.receiverDid);
  vmForDisplay.signature = Buffer.from(vm.signature).toString('base64');

  const onVCRequestClickHandler = () => {
    const vm = createCertificateOfResidenceVCRequest();

    setVCRequestGlobal(vm);
  };

  return {
    vm: JSON.stringify(vmForDisplay, undefined, 2),
    onVCRequestClickHandler,
    vcRequest,
  };
};

export default useSimpleDemoStep1Main;
