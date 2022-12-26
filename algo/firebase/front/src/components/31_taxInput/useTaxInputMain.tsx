import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';


import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';

const useTaxInputMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const router = useRouter();

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            // fullName: input.fullName,
            fullName: "山田太郎",
            // address: input.address,
            address: "東京都渋谷区xxxxxx",
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = (data: TaxInputFormType) => {

        setInput(() => ({
            ...{
                did: "00001",
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

    return { methods, onSubmit }
};

export default useTaxInputMain;