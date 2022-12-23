import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

const useSubsidyConfirmMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
    const setList = useSetRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
    const router = useRouter();

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
        },
    });

    const onSubmit = () => {

        dayjs.locale('ja');
        const id = dayjs().unix();
        const now = dayjs();
        const applicationDate = dayjs(now).format('M月D日(ddd)');

        const subsidyInput: SubsidyInputFormType = {
            ...input,
            id: id,
            applicationDate: applicationDate
        }
        setList((items) => [...items, subsidyInput]);
        reset();

        router.push('/43_subsidyDone', '/43_subsidyDone');
    };

    const back = () => {
        router.push('/41_subsidyInput', '/41_subsidyInput');
    }

    return { methods, onSubmit, back }
};

export default useSubsidyConfirmMain;