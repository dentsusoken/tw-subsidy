import { verifyVerifiableCredential } from '@/lib/algosbt';
import {
  accountVCRequestListState,
  residentVCRequestListState,
  subsidyListState,
  taxVCRequestListState,
  VCListState,
} from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RequestItem } from '../common/ApplicationListContainer/ApplicationListContainer';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { useErrorHandler } from 'react-error-boundary';
import dayjs from 'dayjs';

const useApplicationListMain = () => {
  const [residentList, setResidentList] = useState<RequestItem[]>([]);
  const [accountList, setAccountList] = useState<RequestItem[]>([]);
  const [taxList, setTaxList] = useState<RequestItem[]>([]);
  const [subsidyList, setSubsidyList] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const residentRequestGlobal = useRecoilValue(residentVCRequestListState);
  const accountRequestGlobal = useRecoilValue(accountVCRequestListState);
  const taxRequestGlobal = useRecoilValue(taxVCRequestListState);
  const subsidyRequestGlobal = useRecoilValue(subsidyListState);
  const VCList = useRecoilValue(VCListState);
  const chain = useRecoilValue(chainState);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(() => true);

        const algod = getAlgod(chain);

        if (residentRequestGlobal) {
          const residentList: RequestItem[] = await Promise.all(
            residentRequestGlobal.map(async (item) => {
              let issuedStatus = false;
              let revokeStatus = false;
              if (VCList.resident) {
                const residentVC = VCList.resident.find((vc) => {
                  return (
                    vc.message.content.content.id === item.message.content.id
                  );
                });
                if (residentVC) {
                  issuedStatus = true;
                  revokeStatus = await verifyVerifiableCredential(
                    algod,
                    residentVC
                  );
                }
              }
              return {
                id: item.message.content.id,
                applicationDate: item.message.content.applicationDate,
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              };
            })
          );
          setResidentList(sortList(residentList));
        }

        if (accountRequestGlobal) {
          const accountList = await Promise.all(
            accountRequestGlobal.map(async (item) => {
              let issuedStatus = false;
              let revokeStatus = false;
              if (VCList.account) {
                const accountVC = VCList.account.find((vc) => {
                  return (
                    vc.message.content.content.id === item.message.content.id
                  );
                });
                if (accountVC) {
                  issuedStatus = true;
                  revokeStatus = await verifyVerifiableCredential(
                    algod,
                    accountVC
                  );
                }
              }
              return {
                id: item.message.content.id,
                applicationDate: item.message.content.applicationDate,
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              };
            })
          );
          setAccountList(sortList(accountList));
        }

        if (taxRequestGlobal) {
          const taxList = await Promise.all(
            taxRequestGlobal.map(async (item) => {
              let issuedStatus = false;
              let revokeStatus = false;
              if (VCList.tax) {
                const taxVC = VCList.tax.find((vc) => {
                  return (
                    vc.message.content.content.id === item.message.content.id
                  );
                });
                if (taxVC) {
                  issuedStatus = true;
                  revokeStatus = await verifyVerifiableCredential(algod, taxVC);
                }
              }
              return {
                id: item.message.content.id,
                applicationDate: item.message.content.applicationDate,
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              };
            })
          );
          setTaxList(sortList(taxList));
        }
        if (subsidyRequestGlobal) {
          const subsidyList = await Promise.all(
            subsidyRequestGlobal.map(async (item) => {
              let issuedStatus = false;
              let revokeStatus = false;
              if (VCList.subsidy) {
                const subsidyVC = VCList.subsidy.find((vc) => {
                  return vc.message.content.content.id === item.id;
                });
                if (subsidyVC) {
                  issuedStatus = true;
                  revokeStatus = await verifyVerifiableCredential(
                    algod,
                    subsidyVC
                  );
                }
              }
              return {
                id: item.id,
                applicationDate: item.applicationDate,
                issuedStatus: issuedStatus,
                revokeStatus: revokeStatus,
              };
            })
          );
          setSubsidyList(sortList(subsidyList));
        }
        setIsLoading(() => false);
      })();
    } catch (e) {
      errorHandler(e);
    }
  }, [
    residentRequestGlobal,
    accountRequestGlobal,
    taxRequestGlobal,
    subsidyRequestGlobal,
    VCList,
    chain,
  ]);

  const sortList = (list: RequestItem[]) => {
    list.sort((a, b) => {
      if (dayjs(b.applicationDate).isBefore(dayjs(a.applicationDate))) {
        return -1;
      } else if (dayjs(b.applicationDate).isAfter(dayjs(a.applicationDate))) {
        return 1;
      } else {
        return 0;
      }
    });
    return list;
  };

  return { residentList, accountList, taxList, subsidyList, isLoading };
};

export default useApplicationListMain;
