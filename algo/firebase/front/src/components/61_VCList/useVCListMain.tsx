import { useRecoilValue } from 'recoil';

import { VCListState } from '@/lib/states/mockApp';
import { useState, useEffect } from 'react';
import { VCListType } from '@/lib/types/mockApp/Form';
import { VCListItems } from '../common/VCListContainer/VCListContainer';
import dayjs from 'dayjs';

const useVCListMain = () => {
    const VCListGlobal = useRecoilValue(VCListState);
    const [VCList, setVCList] = useState<VCListType>()
    const [residentVCList, setResidentVCList] = useState<VCListItems>();
    const [accountVCList, setAccountVCList] = useState<VCListItems>();
    const [taxVCList, setTaxVCList] = useState<VCListItems>();

    useEffect(() => {
        setVCList(VCListGlobal);
        if (VCListGlobal) {
            const residentList: VCListItems = VCListGlobal.resident.map((item) => {
                return {
                    id: item.VC.message.content.content.id,
                    issueDate: item.VC.message.content.content.issueDate,
                    acceptStatus: item.acceptStatus
                }
            });
            const accountList: VCListItems = VCListGlobal.account.map((item) => {
                return {
                    id: item.VC.message.content.content.id,
                    issueDate: item.VC.message.content.content.issueDate,
                    acceptStatus: item.acceptStatus
                }
            });
            const taxList: VCListItems = VCListGlobal.tax.map((item) => {
                return {
                    id: item.VC.message.content.content.id,
                    issueDate: item.VC.message.content.content.issueDate,
                    acceptStatus: item.acceptStatus
                }
            });
            setResidentVCList(sortList(residentList));
            setAccountVCList(sortList(accountList));
            setTaxVCList(sortList(taxList));
        }
    }, [VCList]);

    const sortList = (list: VCListItems) => {
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

    return { residentVCList, accountVCList, taxVCList }
};

export default useVCListMain;