import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, VCListType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiableCredential } from '@/lib/algosbt';
import { useErrorHandler } from 'react-error-boundary';

const useSubsidyInputMain = () => {
    const [VCListSelect, setVCListSelect] = useState<VCListType>();
    const [input, setInput] = useRecoilState(subsidyInputState);
    const router = useRouter();
    const VCListGlobal = useRecoilValue(VCListState);
    const [residentVC, setResidentVC] = useState<ResidentInputFormType>();
    const [isEnable, setIsEnable] = useState<boolean>(false);
    const [residentList, setResidentList] = useState<boolean[]>([]);
    const [accountList, setAccountList] = useState<boolean[]>([]);
    const [taxList, setTaxList] = useState<boolean[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const chain = useRecoilValue(chainState);
    const errorHandler = useErrorHandler();

    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            residentVC: input.residentVC,
            accountVC: input.accountVC,
            taxVC: input.taxVC,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    useEffect(() => {
        try {
            (async () => {
                setIsLoading(() => true);

                const algod = getAlgod(chain);

                if (VCListGlobal.resident) {
                    const residentList = await Promise.all(VCListGlobal.resident.map(async (item) => {
                        return await verifyVerifiableCredential(algod, item);
                    }));
                    if (residentList[residentList.length - 1]) {
                        methods.setValue("residentVC", (VCListGlobal.resident.length - 1).toString());
                        methods.setValue("fullName", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.fullName);
                        methods.setValue("address", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.address);
                    } else {
                        setIsEnable(true);
                    }
                    setResidentList(residentList);
                }
                if (VCListGlobal.account) {
                    const accountList = await Promise.all(VCListGlobal.account.map(async (item) => {
                        return await verifyVerifiableCredential(algod, item);
                    }));
                    setAccountList(accountList);
                }
                if (VCListGlobal.tax) {
                    const taxList = await Promise.all(VCListGlobal.tax.map(async (item) => {
                        return await verifyVerifiableCredential(algod, item);
                    }));
                    setTaxList(taxList);
                }
                setIsLoading(() => false);
            })();
        } catch (e) {
            errorHandler(e)
        }
    }, [VCListGlobal, methods])


    const onSubmit = (data: SubsidyInputFormType) => {

        const resident = data.residentVC ? data.residentVC : "-1"
        const account = data.accountVC ? data.accountVC : "-1"
        const tax = data.taxVC ? data.taxVC : "-1"

        setInput(() => ({
            ...{
                id: 0,
                residentVC: resident,
                accountVC: account,
                taxVC: tax,
                fullName: data.fullName,
                address: data.address,
                verifyStatus: false,
                approvalStatus: false,
                applicationDate: "",
                residentVP: undefined,
                accountVP: undefined,
                taxVP: undefined
            },
        }))
        router.push('/42_subsidyConfirm', '/42_subsidyConfirm');
    };

    return { methods, input, residentVC, onSubmit, VCListSelect, isEnable, residentList, accountList, taxList, isLoading }
};

export default useSubsidyInputMain;