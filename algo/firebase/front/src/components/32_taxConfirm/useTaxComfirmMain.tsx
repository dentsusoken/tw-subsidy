import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

const useTaxComfirmMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const setList = useSetRecoilState(taxInputListState);
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = () => {

        dayjs.locale('ja');
        const id = dayjs().unix();
        const now = dayjs();
        const applicationDate = dayjs(now).format('M月D日(ddd)');

        const taxInput: TaxInputFormType = {
            ...input,
            id: id,
            applicationDate: applicationDate
        }
        setList((items) => [...items, taxInput]);
        reset();

        router.push('/33_taxDone', '/33_taxDone');
    };

    const getBack = () => {
        router.push('/31_taxInput', '/31_taxInput');
    }

    return { methods, onSubmit, getBack }
};

export default useTaxComfirmMain;