import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { VCListState } from '@/lib/states/mockApp';

const useSubsidyInputMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
    const router = useRouter();
    const VCListGlobal = useRecoilValue(VCListState);

    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            resident: input.resident,
            account: input.account,
            tax: input.tax,
            // fullName: input.fullName,
            fullName: "山田太郎",
            // address: input.address,
            address: "東京都渋谷区xxxxxx",
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = (data: SubsidyInputFormType) => {

        setInput(() => ({
            ...{
                id: 0,
                resident: data.resident,
                account: data.account,
                tax: data.tax,
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

    return { methods, onSubmit, VCListGlobal }
};

export default useSubsidyInputMain;