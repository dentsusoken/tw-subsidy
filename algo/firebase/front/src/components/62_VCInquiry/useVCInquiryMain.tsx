import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VCListState } from '@/lib/states/mockApp';
import { AccountInputFormType, ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import { verifyVerifiableCredential } from '@/lib/algosbt';

const useVCInquiryMain = () => {
    const router = useRouter();
    const [type, setType] = useState("");
    const [idx, setIdx] = useState(0);
    const [applicationDate, setApplicationDate] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [acceptDate, setAcceptDate] = useState("");
    const [revokeStatus, setRevokeStatus] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [VCListGlobal, setVCListGlobal] = useRecoilState(VCListState);
    const [residentInput, setResidentInput] = useState<ResidentInputFormType>()
    const [accountInput, setAccountInput] = useState<AccountInputFormType>()
    const [taxInput, setTaxInput] = useState<TaxInputFormType>()
    const chain = useRecoilValue(chainState);

    useEffect(() => {
        (async () => {
            setIsLoading(() => true);

            const algod = getAlgod(chain);

            if (typeof router.query.idx === "string" && typeof router.query.type === "string") {
                setType(router.query.type)
                setIdx(parseInt(router.query.idx))
                if (router.query.type === "住民票") {
                    const VC = VCListGlobal.resident[parseInt(router.query.idx) - 1];
                    setResidentInput(VC.message.content.content);
                    setApplicationDate(dayjs(VC.message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                    setIssueDate(dayjs(VC.message.content.content.issueDate).format("YY/MM/DD HH:mm"));
                    const revoke = await verifyVerifiableCredential(algod, VC);
                    setRevokeStatus(revoke);
                }
                else if (router.query.type === "口座実在証明書") {
                    const VC = VCListGlobal.account[parseInt(router.query.idx) - 1];
                    setAccountInput(VC.message.content.content);
                    setApplicationDate(dayjs(VC.message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                    setIssueDate(dayjs(VC.message.content.content.issueDate).format("YY/MM/DD HH:mm"));
                    const revoke = await verifyVerifiableCredential(algod, VC);
                    setRevokeStatus(revoke);
                }
                else if (router.query.type === "納税証明書") {
                    const VC = VCListGlobal.tax[parseInt(router.query.idx) - 1];
                    setTaxInput(VC.message.content.content);
                    setApplicationDate(dayjs(VC.message.content.content.applicationDate).format("YY/MM/DD HH:mm"));
                    setIssueDate(dayjs(VC.message.content.content.issueDate).format("YY/MM/DD HH:mm"));
                    const revoke = await verifyVerifiableCredential(algod, VC);
                    setRevokeStatus(revoke);
                }
            }

            setIsLoading(() => false);
        })();
    }, [VCListGlobal, router.query]);

    const back = () => {
        router.push("/61_VCList")
    }

    return { type, idx, applicationDate, issueDate, acceptDate, revokeStatus, residentInput, accountInput, taxInput, isLoading, back }
};

export default useVCInquiryMain;