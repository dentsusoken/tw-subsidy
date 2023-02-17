import { Algodv2 } from 'algosdk';
import { useRecoilState } from 'recoil';

import {
  AccountVCRequestType,
  AccountVCType,
  ResidentVCRequestType,
  ResidentVCType,
  SubsidyInputFormType,
  SubsidyVCType,
  TaxVCRequestType,
  TaxVCType,
  VPContent,
} from '@/lib/types/mockApp/Form';

import { getAlgod } from '@/lib/algo/algod/algods';
import {
  verifyVerifiableMessage,
  verifyVerifiablePresentation,
} from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';
import { useErrorHandler } from 'react-error-boundary';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import dayjs from 'dayjs';
import { useState } from 'react';

export type verifyVPResultType = {
  verifyStatus: boolean;
  residentVerifyStatus: boolean;
  accountVerifyStatus: boolean;
  taxVerifyStatus: boolean;
};

const useVerifyHandler = () => {
  const errorHandler = useErrorHandler();
  const [verifyStatusList, setVerifyStatus] = useState<boolean[]>([]);
  const [chain] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  dayjs.locale('ja');

  const verifyVCHandler = (
    vc:
      | ResidentVCRequestType
      | AccountVCRequestType
      | TaxVCRequestType
      | ResidentVCType
      | AccountVCType
      | TaxVCType
      | SubsidyVCType
  ) => {
    try {
      if (vc && holderDidAccountGlobal && issuerDidAccountGlobal) {
        return verifyVerifiableMessage(vc);
      }
    } catch (e) {
      errorHandler(e);
    }
    return false;
  };

  const verifyVCList = (
    vcList: Array<
      | ResidentVCRequestType
      | AccountVCRequestType
      | TaxVCRequestType
      | ResidentVCType
      | AccountVCType
      | TaxVCType
      | SubsidyVCType
    >
  ) => {
    try {
      vcList.map((item, index) => {
        const result = verifyVCHandler(item);
        const update = verifyStatusList;
        update[index] = result;
        setVerifyStatus(() => update);
      });
    } catch (e) {
      errorHandler(e);
    }
  };

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

  const verifyVPHandler = async (
    subsidyInput: SubsidyInputFormType
  ): Promise<verifyVPResultType> => {
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

      return {
        verifyStatus,
        residentVerifyStatus,
        accountVerifyStatus,
        taxVerifyStatus,
      };
    } catch (e) {
      errorHandler(e);
    }
    return {
      verifyStatus: false,
      residentVerifyStatus: false,
      accountVerifyStatus: false,
      taxVerifyStatus: false,
    };
  };

  const verifyVPList = async (subsidyInputList: SubsidyInputFormType[]) => {
    try {
      if (subsidyInputList.length > 0) {
        setVerifyStatus(() => []);
        subsidyInputList.forEach(async (item, index) => {
          const result = await verifyVPHandler(item);
          const update = verifyStatusList;
          update[index] = result.verifyStatus;
          setVerifyStatus(() => update);
        });
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    verifyStatusList,
    verifyVCHandler,
    verifyVCList,
    verifyVPHandler,
    verifyVPList,
  };
};

export default useVerifyHandler;
