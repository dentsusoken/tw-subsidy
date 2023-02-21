import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  accountVCRequestListState,
  residentVCRequestListState,
  subsidyListState,
  taxVCRequestListState,
  VCListState,
} from '@/lib/states/mockApp';
import {
  AccountInputFormType,
  ResidentInputFormType,
} from '@/lib/types/mockApp/inputForm';
import {
  SubsidyInputFormType,
  TaxInputFormType,
} from '@/lib/types/mockApp/Form';

import { RequestItem } from '../common/ApplicationListContainer/ApplicationListContainer';
import { verifyVerifiableCredential } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useErrorHandler } from 'react-error-boundary';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { verifyVPResultType } from '@/lib/hooks/MockApp/useVerifyHandler';

const useVCInquiryMain = () => {
  const router = useRouter();
  const { verifyVCHandler, verifyVPHandler } = useVerifyHandler();
  const [type, setType] = useState('');
  const [verifyVPResult, setVerifyVPResult] = useState<verifyVPResultType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [residentInput, setResidentInput] = useState<ResidentInputFormType>();
  const [accountInput, setAccountInput] = useState<AccountInputFormType>();
  const [taxInput, setTaxInput] = useState<TaxInputFormType>();
  const [subsidyInput, setSubsidyInput] = useState<SubsidyInputFormType>();
  const [reqItem, setReqItem] = useState<RequestItem>({
    id: 0,
    applicationDate: '',
    issuedStatus: false,
    revokeStatus: false,
  });
  const VCListGlobal = useRecoilValue(VCListState);
  const residentRequestGlobal = useRecoilValue(residentVCRequestListState);
  const accountRequestGlobal = useRecoilValue(accountVCRequestListState);
  const taxRequestGlobal = useRecoilValue(taxVCRequestListState);
  const subsidyRequestGlobal = useRecoilValue(subsidyListState);

  const chain = useRecoilValue(chainState);
  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        if (
          typeof router.query.id === 'string' &&
          typeof router.query.type === 'string'
        ) {
          const algod = getAlgod(chain);
          setType(router.query.type);
          const id = parseInt(router.query.id);
          const type = router.query.type;

          if (type === 'resident') {
            const req = residentRequestGlobal.find((v) => {
              return v.message.content.id === id;
            });
            const vc = VCListGlobal.resident.find((v) => {
              return v.message.content.content.id === id;
            });
            if (req) {
              let issuedStatus = false;
              let revokeStatus = false;
              setResidentInput(req.message.content);
              if (vc) {
                issuedStatus = true;
                revokeStatus = await verifyVerifiableCredential(algod, vc);
              }
              setReqItem({
                id: id,
                applicationDate: dayjs(
                  req.message.content.applicationDate
                ).format('YY/MM/DD HH:mm'),
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              });
            }
          } else if (type === 'account') {
            const req = accountRequestGlobal.find((v) => {
              return v.message.content.id === id;
            });
            const vc = VCListGlobal.account.find((v) => {
              return v.message.content.content.id === id;
            });
            if (req) {
              let issuedStatus = false;
              let revokeStatus = false;
              setAccountInput(req.message.content);
              if (vc) {
                issuedStatus = true;
                revokeStatus = await verifyVerifiableCredential(algod, vc);
              }
              setReqItem({
                id: id,
                applicationDate: dayjs(
                  req.message.content.applicationDate
                ).format('YY/MM/DD HH:mm'),
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              });
            }
          } else if (type === 'tax') {
            const req = taxRequestGlobal.find((v) => {
              return v.message.content.id === id;
            });
            const vc = VCListGlobal.tax.find((v) => {
              return v.message.content.content.id === id;
            });
            if (req) {
              let issuedStatus = false;
              let revokeStatus = false;
              setTaxInput(req.message.content);
              if (vc) {
                issuedStatus = true;
                revokeStatus = await verifyVerifiableCredential(algod, vc);
              }
              setReqItem({
                id: id,
                applicationDate: dayjs(
                  req.message.content.applicationDate
                ).format('YY/MM/DD HH:mm'),
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              });
            }
          } else if (type === 'subsidy') {
            const req = subsidyRequestGlobal.find((v) => {
              return v.id === id;
            });
            const vc = VCListGlobal.subsidy.find((v) => {
              return v.message.content.content.id === id;
            });
            if (req) {
              let issuedStatus = false;
              let revokeStatus = false;
              setSubsidyInput(req);
              if (vc) {
                issuedStatus = true;
                revokeStatus = await verifyVerifiableCredential(algod, vc);
              }
              setReqItem({
                id: id,
                applicationDate: dayjs(req.applicationDate).format(
                  'YY/MM/DD HH:mm'
                ),
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              });
              const verifyVP = await verifyVPHandler(req);
              setVerifyVPResult(verifyVP);
            }
          }
        }
        setIsLoading(false);
      })();
    } catch (e) {
      errorHandler(e);
    }
  }, [
    residentRequestGlobal,
    accountRequestGlobal,
    taxRequestGlobal,
    subsidyRequestGlobal,
    chain,
    VCListGlobal,
    router.query,
    errorHandler,
  ]);

  const getVCType = () => {
    switch (type) {
      case 'resident':
        return '住民票紐付申請';
      case 'account':
        return '口座実在証明申請';
      case 'tax':
        return '納税証明書交付申請';
      case 'subsidy':
        return '補助金申請';
      default:
        return '';
    }
  };

  const back = () => {
    router.push('/71_applicationList');
  };

  return {
    type,
    residentInput,
    accountInput,
    taxInput,
    subsidyInput,
    back,
    reqItem,
    isLoading,
    verifyVPResult,
    getVCType,
  };
};

export default useVCInquiryMain;
