import { Algodv2 } from 'algosdk';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, VPContent } from '@/lib/types/mockApp/Form';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { getAlgod } from '@/lib/algo/algod/algods';
import {
  createVerifiableCredential,
  verifyVerifiablePresentation,
} from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';
import { useErrorHandler } from 'react-error-boundary';
import { issuerPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import { VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useSubsidyListDetailMain = () => {
  const [listState, setListState] = useRecoilState(subsidyListState);
  const [isIssuing, setIsIssuing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [residentVerifyStatus, setResidentVerifyStatus] = useState(false);
  const [accountVerifyStatus, setAccountVerifyStatus] = useState(false);
  const [taxVerifyStatus, setTaxVerifyStatus] = useState(false);
  const setVCList = useSetRecoilState(VCListState);
  const router = useRouter();
  const [VCRequest, setVCRequest] = useState<SubsidyInputFormType>();
  const errorHandler = useErrorHandler();
  const [chain] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  dayjs.locale('ja');

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(() => true);
        const VCRequest = listState.find(
          (v) => v.id === Number(router.query.id)
        );
        if (VCRequest) {
          await verifyHandler(VCRequest);
        }
        setIsLoading(() => false);
      })();
    } catch (e) {
      errorHandler(e);
    }
  }, [chain]);

  const methods = useForm<SubsidyInputFormType>({
    defaultValues: {
      verifyStatus: false,
      approvalStatus: false,
    },
  });

  const VPVerify = async (
    algod: Algodv2,
    VP: VerifiableMessage<VPContent> | undefined
  ) => {
    try {
      let verify = false;
      if (VP) {
        verify = (await verifyVerifiablePresentation(algod, VP)).vpVerified;
      } else {
        verify = true;
      }
      return verify;
    } catch (e) {
      throw e;
    }
  };

  const verifyHandler = async (VCRequest: SubsidyInputFormType) => {
    try {
      const algod = getAlgod(chain);

      let residentVerifyStatus = false;
      let accountVerifyStatus = false;
      let taxVerifyStatus = false;
      let verifyStatus = false;

      residentVerifyStatus = await VPVerify(algod, VCRequest.residentVP);
      accountVerifyStatus = await VPVerify(algod, VCRequest.accountVP);
      taxVerifyStatus = await VPVerify(algod, VCRequest.taxVP);

      setResidentVerifyStatus(residentVerifyStatus);
      setAccountVerifyStatus(accountVerifyStatus);
      setTaxVerifyStatus(taxVerifyStatus);

      verifyStatus =
        residentVerifyStatus && accountVerifyStatus && taxVerifyStatus;

      const replaceData: SubsidyInputFormType = {
        ...VCRequest,
        verifyStatus: verifyStatus,
      };

      const updateData = listState.map((item) => {
        if (item.id === replaceData.id) {
          return replaceData;
        } else {
          return item;
        }
      });

      setVCRequest(replaceData);
      setListState(updateData);
    } catch (e) {
      errorHandler(e);
    }
  };

  const onSubmit = async () => {
    try {
      setIsIssuing(() => true);
      const algod = getAlgod(chain);
      if (
        VCRequest &&
        !VCRequest.approvalStatus &&
        issuerDidAccountGlobal &&
        holderDidAccountGlobal
      ) {
        if (VCRequest.verifyStatus) {
          const replaceData: SubsidyInputFormType = {
            ...VCRequest,
            approvalStatus: true,
            issueDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          };

          const updateData = listState.map((item) => {
            if (item.id === replaceData.id) {
              return replaceData;
            } else {
              return item;
            }
          });
          const vc = await createVerifiableCredential(
            algod,
            issuerDidAccountGlobal,
            holderDidAccountGlobal.did,
            replaceData,
            issuerPw
          );
          setListState(updateData);
          setVCList((items) => ({ ...items, subsidy: [...items.subsidy, vc] }));
        }
      }
      setIsIssuing(() => false);
      router.push(
        {
          pathname: '/46_subsidyListDone',
          query: { proc: 'approve' },
        },
        '/46_subsidyListDone'
      );
    } catch (e) {
      errorHandler(e);
    }
  };

  const reject = () => {
    router.push(
      {
        pathname: '/46_subsidyListDone',
        query: { proc: 'reject' },
      },
      '/46_subsidyListDone'
    );
  };

  const back = () => {
    router.push('/44_subsidyList');
  };

  return {
    methods,
    VCRequest,
    onSubmit,
    reject,
    verifyHandler,
    back,
    isIssuing,
    residentVerifyStatus,
    accountVerifyStatus,
    taxVerifyStatus,
    isLoading,
  };
};

export default useSubsidyListDetailMain;
