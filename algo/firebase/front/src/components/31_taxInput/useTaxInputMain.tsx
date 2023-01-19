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

    useEffect(() => {
        if (VCListGlobal && VCListGlobal.resident.length > 0) {
            VCListGlobal.resident.map((value) => {
                if (value.acceptStatus) {
                    setResidentVC(VCListGlobal.resident[VCListGlobal.resident.length - 1].VC.message.content.content);
                    methods.setValue("fullName", VCListGlobal.resident[VCListGlobal.resident.length - 1].VC.message.content.content.fullName)
                    methods.setValue("address", VCListGlobal.resident[VCListGlobal.resident.length - 1].VC.message.content.content.address)
                }
            })
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

    return { methods, residentVC, onSubmit }
};

export default useTaxInputMain;