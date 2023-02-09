import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { residentVCListState, VCListState } from '@/lib/states/mockApp';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiableCredential } from '@/lib/algosbt';

const useTaxInputMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const router = useRouter();

    const VCListGlobal = useRecoilValue(residentVCListState);
    const [residentVC, setResidentVC] = useState<ResidentInputFormType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const chain = useRecoilValue(chainState);
    const [isEnable, setIsEnable] = useState<boolean>(false);
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

    useEffect(() => {
        (async () => {
            setIsLoading(() => true);

            const algod = getAlgod(chain);

            if (VCListGlobal && VCListGlobal.length > 0) {
                const idx = VCListGlobal.length - 1
                const revoke = await verifyVerifiableCredential(algod, VCListGlobal[idx]);
                if (revoke) {
                    setResidentVC(VCListGlobal[idx].message.content.content);
                    methods.setValue("fullName", VCListGlobal[VCListGlobal.length - 1].message.content.content.fullName)
                    methods.setValue("address", VCListGlobal[VCListGlobal.length - 1].message.content.content.address)
                } else {
                    setIsEnable(true);
                }
            }
            setIsLoading(() => false);
        })();
    }, [VCListGlobal, methods])


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

    return { methods, residentVC, isEnable, onSubmit, isLoading }
};

export default useTaxInputMain;