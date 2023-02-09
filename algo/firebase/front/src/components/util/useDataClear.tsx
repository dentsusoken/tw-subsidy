import { useRecoilState, useSetRecoilState } from 'recoil';

import {
    residentInputState,
    residentVCListState,
    residentVCRequestListState,
    accountInputState,
    accountVCListState,
    accountVCRequestListState,
    taxInputState,
    taxVCListState,
    taxVCRequestListState,
    subsidyInputState,
    subsidyListState,
    VCListState
} from '@/lib/states/mockApp';
import { useErrorHandler } from 'react-error-boundary';
import { useState } from 'react';


const useDataClear = () => {
    const clearResidentInputState = useSetRecoilState(residentInputState);
    const clearResidentVCListState = useSetRecoilState(residentVCListState);
    const clearResidentVCRequestListState = useSetRecoilState(residentVCRequestListState);
    const clearAccountInputState = useSetRecoilState(accountInputState);
    const clearAccountVCListState = useSetRecoilState(accountVCListState);
    const clearAccountVCRequestListState = useSetRecoilState(accountVCRequestListState);
    const clearTaxInputState = useSetRecoilState(taxInputState);
    const clearTaxVCListState = useSetRecoilState(taxVCListState);
    const clearTaxVCRequestListState = useSetRecoilState(taxVCRequestListState);
    const clearSubsidyInputState = useSetRecoilState(subsidyInputState);
    const clearSubsidyListState = useSetRecoilState(subsidyListState);
    const [VCList, clearVCListState] = useRecoilState(VCListState);

    const [clearMsg, setclearMsg] = useState("")

    const errorHandler = useErrorHandler();

    const clearInputState = () => {
        clearResidentInputState(() => ({
            id: 0,
            fullName: '',
            fullNameFurigana: '',
            address: '',
            addressRegistDate: '',
            addressRegistYear: '',
            addressRegistMonth: '',
            permanentAddress: '',
            applicationDate: undefined,
            issueDate: undefined,
            verifyStatus: undefined,
            approvalStatus: undefined
        }))
        clearAccountInputState(() => ({
            id: 0,
            bankCode: '',
            branchNumber: '',
            accountNumber: '',
            corporateName: '',
            applicantName: '',
            applicantAddress: '',
            applicationDate: undefined,
            issueDate: undefined,
            verifyStatus: undefined,
            approvalStatus: undefined,
        }))
        clearTaxInputState(() => ({
            id: 0,
            applicationYear: "",
            corporationName: "",
            corporationAddress: "",
            fullName: "",
            address: "",
            applicationDate: "",
            issueDate: "",
            verifyStatus: false,
            approvalStatus: false,
        }))
        clearSubsidyInputState(() => ({
            id: 0,
            resident: "",
            account: "",
            tax: "",
            fullName: "",
            address: "",
            applicationDate: "",
            issueDate: "",
            residentVerifyStatus: false,
            accountVerifyStatus: false,
            taxVerifyStatus: false,
            verifyStatus: false,
            approvalStatus: false,
            residentVP: undefined,
            accountVP: undefined,
            taxVP: undefined
        }))
    };

    const clearAllState = () => {
        try {
            clearInputState();
            clearResidentVCListState(() => []);
            clearResidentVCRequestListState(() => []);
            clearAccountVCListState(() => []);
            clearAccountVCRequestListState(() => []);
            clearTaxVCListState(() => []);
            clearTaxVCRequestListState(() => []);
            clearSubsidyListState(() => []);
            clearVCListState(() => ({
                resident: [],
                account: [],
                tax: [],
                subsidy: []
            }));
            showClearSuccessMsg();
        } catch (e) {
            errorHandler(e);
        }
    };

    const clearOldData = () => {
        if (VCList) {
            if (VCList.resident && Array.isArray(VCList.resident) && VCList.resident.length > 0 && Object.hasOwn(VCList.resident[0], "acceptStatus")) {
                clearAllState();
            }
            if (VCList.account && Array.isArray(VCList.account) && VCList.account.length > 0 && Object.hasOwn(VCList.account[0], "acceptStatus")) {
                clearAllState();
            }
            if (VCList.tax && Array.isArray(VCList.tax) && VCList.tax.length > 0 && Object.hasOwn(VCList.tax[0], "acceptStatus")) {
                clearAllState();
            }
        }
    }

    const showClearSuccessMsg = async () => {
        setclearMsg("データクリアが完了しました。")
        await delay(5000);
        setclearMsg("")
    }

    const delay = (ms: number | undefined) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    return { clearMsg, clearInputState, clearAllState, clearOldData }
};

export default useDataClear;