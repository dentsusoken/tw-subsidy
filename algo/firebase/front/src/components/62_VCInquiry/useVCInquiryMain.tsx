import { useRecoilState } from 'recoil';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VCListState } from '@/lib/states/mockApp';
import { AccountInputFormType, ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

const useVCInquiryMain = () => {
    const router = useRouter();
    const [type, setType] = useState("");
    const [idx, setIdx] = useState(0);
    const [applicationDate, setApplicationDate] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [acceptDate, setAcceptDate] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const [VCListGlobal, setVCListGlobal] = useRecoilState(VCListState);
    const [residentInput, setResidentInput] = useState<ResidentInputFormType>()
    const [accountInput, setAccountInput] = useState<AccountInputFormType>()
    const [taxInput, setTaxInput] = useState<TaxInputFormType>()

    useEffect(() => {
        if (typeof router.query.idx === "string" && typeof router.query.type === "string") {
            setType(router.query.type)
            setIdx(parseInt(router.query.idx))
            if (router.query.type === "住民票") {
                setResidentInput(VCListGlobal.resident[parseInt(router.query.idx) - 1].message.content.content);
                setApplicationDate(dayjs(VCListGlobal.resident[parseInt(router.query.idx) - 1].message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                setIssueDate(dayjs(VCListGlobal.resident[parseInt(router.query.idx) - 1].message.content.content.issueDate).format("YY/MM/DD HH:mm"));

            }
            else if (router.query.type === "口座実在証明書") {
                setAccountInput(VCListGlobal.account[parseInt(router.query.idx) - 1].message.content.content);
                setApplicationDate(dayjs(VCListGlobal.account[parseInt(router.query.idx) - 1].message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                setIssueDate(dayjs(VCListGlobal.account[parseInt(router.query.idx) - 1].message.content.content.issueDate).format("YY/MM/DD HH:mm"));

            }
            else if (router.query.type === "納税証明書") {
                setTaxInput(VCListGlobal.tax[parseInt(router.query.idx) - 1].message.content.content);
                setApplicationDate(dayjs(VCListGlobal.tax[parseInt(router.query.idx) - 1].message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                setIssueDate(dayjs(VCListGlobal.tax[parseInt(router.query.idx) - 1].message.content.content.issueDate).format("YY/MM/DD HH:mm"));

            }
        }
    });

    const back = () => {
        router.push("/61_VCList")
    }

    const accept = async () => {
        dayjs.locale('ja');
        const now = dayjs();
        const acceptDate = dayjs(now).format('YYYY-MM-DD HH:mm:ss');
        setIsEnabled(!isEnabled);
        if (type === "住民票") {
            const replaceData = VCListGlobal.resident.map((value, index) => index === idx - 1 ?  value : value)
            setVCListGlobal((items) => (items.resident ? { ...items, resident: replaceData } : items));
        }
        else if (type === "口座実在証明書") {
            const replaceData = VCListGlobal.account.map((value, index) => index === idx - 1 ? value: value)
            setVCListGlobal((items) => (items.account ? { ...items, account: replaceData } : items));
        }
        else if (type === "納税証明書") {
            const replaceData = VCListGlobal.tax.map((value, index) => index === idx - 1 ? value : value)
            setVCListGlobal((items) => (items.tax ? { ...items, tax: replaceData } : items));
        }
        setAcceptDate(now.format("YY/MM/DD HH:mm"));
    }

    return { type, idx, applicationDate, issueDate, acceptDate, isEnabled, residentInput, accountInput, taxInput, back, accept }
};

export default useVCInquiryMain;