import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiablePresentation } from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';

const useSubsidyListDetailMain = () => {
    const input = useRecoilValue(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
    const router = useRouter();
    const [pathname, setPathName] = useState("")
    const [chain] = useRecoilState(chainState);

    useEffect(() => {
        setPathName(router.pathname);
    })

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

    const onSubmit = async () => {

        const replaceData: SubsidyInputFormType = { ...input, }

        if (!input.approvalStatus) {
            const algod = getAlgod(chain);
            if (input.resident && input.residentVP) {
                replaceData.verifyStatus = await verifyVerifiablePresentation(algod, input.residentVP)
            }
            if (input.account && input.accountVP) {
                replaceData.verifyStatus = await verifyVerifiablePresentation(algod, input.accountVP)
            }
            if (input.tax && input.taxVP) {
                replaceData.verifyStatus = await verifyVerifiablePresentation(algod, input.taxVP)
            }

            if (replaceData.verifyStatus) {
                replaceData.approvalStatus = true;
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
        }

        router.push({
            pathname: '/46_subsidyListDone',
            query: { proc: "approve" }
        }, '/46_subsidyListDone');
    };

    const back = () => {
        router.push('/44_subsidyList', '/44_subsidyList');
    }

    return { pathname, methods, onSubmit, back }
};

export default useSubsidyListDetailMain;