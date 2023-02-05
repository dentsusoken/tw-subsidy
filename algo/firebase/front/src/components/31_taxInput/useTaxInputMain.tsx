import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { VCListState } from '@/lib/states/mockApp';

const useTaxInputMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const router = useRouter();

    const VCListGlobal = useRecoilValue(VCListState);
    const [residentVC, setResidentVC] = useState<ResidentInputFormType>();
    const [isEnable, setIsEnable] = useState<boolean>(false);

    useEffect(() => {
        if (VCListGlobal && VCListGlobal.resident.length > 0) {
            setResidentVC(VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content);
            methods.setValue("fullName", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.fullName)
            methods.setValue("address", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.address)
        }
        else {
            setIsEnable(true);
        }
    })

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            // fullName: input.fullName,
            fullName: "",
            // address: input.address,
            address: "",
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = (data: TaxInputFormType) => {

        setInput(() => ({
            ...{
                id: 0,
                applicationYear: data.applicationYear,
                corporationName: data.corporationName,
                corporationAddress: data.corporationAddress,
                fullName: data.fullName,
                address: data.address,
                applicationDate: "",
                verifyStatus: false,
                approvalStatus: false,
            },
        }))
        router.push('/32_taxConfirm', '/32_taxConfirm');
    };

    return { methods, residentVC, isEnable, onSubmit }
};

export default useTaxInputMain;