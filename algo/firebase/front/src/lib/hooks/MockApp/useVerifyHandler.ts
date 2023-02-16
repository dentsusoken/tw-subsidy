import { Algodv2 } from 'algosdk';
import { useRecoilState } from 'recoil';

import { SubsidyInputFormType, VPContent } from '@/lib/types/mockApp/Form';

import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiablePresentation } from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';
import { useErrorHandler } from 'react-error-boundary';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import dayjs from 'dayjs';
import { useState } from 'react';

const useVerifyHandler = () => {
  const errorHandler = useErrorHandler();
  const [verifyStatusList, setVerifyStatus] = useState<boolean[]>([]);
  const [chain] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  dayjs.locale('ja');

  const verifyVP = async (
    algod: Algodv2,
    vp: VerifiableMessage<VPContent> | undefined
  ) => {
    try {
      let verify = false;
      if (vp) {
        verify = (await verifyVerifiablePresentation(algod, vp)).vpVerified;
      } else {
        verify = true;
      }
      return verify;
    } catch (e) {
      throw e;
    }
  };

  const verifyVPHandler = async (subsidyInput: SubsidyInputFormType) => {
    try {
      const algod = getAlgod(chain);

      let residentVerifyStatus = false;
      let accountVerifyStatus = false;
      let taxVerifyStatus = false;
      let verifyStatus = false;

      residentVerifyStatus = await verifyVP(algod, subsidyInput.residentVP);
      accountVerifyStatus = await verifyVP(algod, subsidyInput.accountVP);
      taxVerifyStatus = await verifyVP(algod, subsidyInput.taxVP);

      verifyStatus =
        residentVerifyStatus && accountVerifyStatus && taxVerifyStatus;

      const replaceData: SubsidyInputFormType = {
        ...subsidyInput,
        verifyStatus: verifyStatus,
      };

      return {
        replaceData,
        residentVerifyStatus,
        accountVerifyStatus,
        taxVerifyStatus,
      };
    } catch (e) {
      errorHandler(e);
    }
    return {
      replaceData: subsidyInput,
      residentVerifyStatus: false,
      accountVerifyStatus: false,
      taxVerifyStatus: false,
    };
  };

  const verifyVPList = async (subsidyInputList: SubsidyInputFormType[]) => {
    if (subsidyInputList.length > 0) {
      setVerifyStatus(() => []);
      subsidyInputList.forEach(async (item, index) => {
        const result = await verifyVPHandler(item);
        const update = verifyStatusList;
        update[index] = result.replaceData.verifyStatus;
        setVerifyStatus(() => update);
      });
    }
  };

  return {
    verifyStatusList,
    verifyVPHandler,
    verifyVPList,
  };
};

export default useVerifyHandler;
