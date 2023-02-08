import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, VCListType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';

const useSubsidyInputMain = () => {
    const [VCListSelect, setVCListSelect] = useState<VCListType>();
    const [input, setInput] = useRecoilState(subsidyInputState);
    const router = useRouter();
    const VCListGlobal = useRecoilValue(VCListState);
    const [residentVC, setResidentVC] = useState<ResidentInputFormType>();
    const [isEnable, setIsEnable] = useState<boolean>(false);

    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            resident: input.resident,
            account: input.account,
            tax: input.tax,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    useEffect(() => {
        setVCListSelect(VCListGlobal);
        if (VCListGlobal && VCListGlobal.resident.length > 0) {
            setResidentVC(VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content);
            methods.setValue("resident", (VCListGlobal.resident.length - 1).toString());
            methods.setValue("fullName", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.fullName);
            methods.setValue("address", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.address);
        }
        else {
            setIsEnable(true);
        }
    }, [VCListGlobal, methods])


    const onSubmit = (data: SubsidyInputFormType) => {

        const resident = data.resident ? data.resident : "-1"
        const account = data.account ? data.account : "-1"
        const tax = data.resident ? data.tax : "-1"

        setInput(() => ({
            ...{
                id: 0,
                resident: resident,
                account: account,
                tax: tax,
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

    return { methods, input, residentVC, onSubmit, VCListSelect, isEnable }
};

export default useSubsidyInputMain;