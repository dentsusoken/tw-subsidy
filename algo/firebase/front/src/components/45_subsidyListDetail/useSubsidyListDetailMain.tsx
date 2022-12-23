import { useForm } from 'react-hook-form';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

const useSubsidyListDetailMain = () => {
    const input = useRecoilValue(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
    const router = useRouter();

    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            resident: input.resident,
            account: input.account,
            tax: input.tax,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
        },
    });

    const onSubmit = () => {

        const replaceData: SubsidyInputFormType = {
            ...input,
            verifyStatus: true,
            approvalStatus: true,
        }

        const updateData = listState.map((item) => {
            if (item.id === replaceData.id) {
                return replaceData;
            }
            else {
                return item;
            }
        })

        setListState(updateData);
        reset();

        router.push({
            pathname: '/46_subsidyListDone',
            query: { proc: "approve" }
        }, '/46_subsidyListDone');
    };

    const back = () => {
        router.push('/44_subsidyList', '/44_subsidyList');
    }

    return { methods, onSubmit, back }
};

export default useSubsidyListDetailMain;