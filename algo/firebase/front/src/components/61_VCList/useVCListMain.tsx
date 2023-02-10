import { useRecoilValue } from 'recoil';

import { VCListState } from '@/lib/states/mockApp';
import { useState, useEffect } from 'react';
import { VCListItem } from '../common/VCListContainer/VCListContainer';
import dayjs from 'dayjs';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiableCredential } from '@/lib/algosbt';
import { useErrorHandler } from 'react-error-boundary';

const useVCListMain = () => {
    const VCListGlobal = useRecoilValue(VCListState);
    const [residentList, setResidentList] = useState<VCListItem[]>([]);
    const [accountList, setAccountList] = useState<VCListItem[]>([]);
    const [taxList, setTaxList] = useState<VCListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const chain = useRecoilValue(chainState);
    const errorHandler = useErrorHandler();
    dayjs.locale('ja');

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(() => true);

                const algod = getAlgod(chain);

                if (VCListGlobal.resident) {
                    const residentList: VCListItem[] = await Promise.all(VCListGlobal.resident.map(async (item) => {
                        const revokeStatus = await verifyVerifiableCredential(algod, item);
                        return {
                            id: item.message.content.content.id,
                            applicationDate: item.message.content.content.applicationDate,
                            issueDate: item.message.content.content.issueDate,
                            revokeStatus: revokeStatus,
                        }
                    }));
                    setResidentList(sortList(residentList));
                }
                if (VCListGlobal.account) {
                    const accountList: VCListItem[] = await Promise.all(VCListGlobal.account.map(async (item) => {
                        const revokeStatus = await verifyVerifiableCredential(algod, item);
                        return {
                            id: item.message.content.content.id,
                            applicationDate: item.message.content.content.applicationDate,
                            issueDate: item.message.content.content.issueDate,
                            revokeStatus: revokeStatus,
                        }
                    }));
                    setAccountList(sortList(accountList));
                }
                if (VCListGlobal.tax) {
                    const taxList: VCListItem[] = await Promise.all(VCListGlobal.tax.map(async (item) => {
                        const revokeStatus = await verifyVerifiableCredential(algod, item);
                        return {
                            id: item.message.content.content.id,
                            applicationDate: item.message.content.content.applicationDate,
                            issueDate: item.message.content.content.issueDate,
                            revokeStatus: revokeStatus,
                        }
                    }));
                    setTaxList(sortList(taxList));
                }
                setIsLoading(() => false);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, [VCListGlobal, chain]);

    const sortList = (list: VCListItem[]) => {
        list.sort((a, b) => {
            if (dayjs(b.issueDate).isBefore(dayjs(a.issueDate))) {
                return -1;
            }
            else if (dayjs(b.issueDate).isAfter(dayjs(a.issueDate))) {
                return 1
            }
            else {
                return 0
            }
        });
        return list;
    }

    return { residentList, accountList, taxList, isLoading }
};

export default useVCListMain;