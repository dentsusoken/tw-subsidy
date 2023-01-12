import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, VPContent } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiablePresentation } from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';

const useSubsidyListDetailMain = () => {
    const input = useRecoilValue(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    // const reset = useResetRecoilState(subsidyInputState);
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

    const VPVerify = async (flg: boolean, VP: VerifiableMessage<VPContent> | undefined) => {
        const algod = getAlgod(chain);
        let verify = false
        if (flg && VP) {
            verify = await verifyVerifiablePresentation(algod, VP);
        }
        else {
            verify = true;
        }
        return verify
    }

    const onSubmit = async () => {
        if (!input.approvalStatus) {
            const replaceData: SubsidyInputFormType = { ...input, }
            let residentVerifyStatus = false;
            let accountVerifyStatus = false;
            let taxVerifyStatus = false;
            residentVerifyStatus = await VPVerify(input.resident, input.residentVP);
            accountVerifyStatus = await VPVerify(input.account, input.accountVP);
            taxVerifyStatus = await VPVerify(input.tax, input.taxVP);

            if (residentVerifyStatus && accountVerifyStatus && taxVerifyStatus) {
                replaceData.verifyStatus = true;
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
            // reset();
        }

        router.push({
            pathname: '/46_subsidyListDone',
            query: { proc: "approve" }
        }, '/46_subsidyListDone');
    };

    const reject = () => {
        router.push({
            pathname: '/46_subsidyListDone',
            query: { proc: "reject" }
        }, '/46_subsidyListDone')
    };

    return { pathname, methods, onSubmit, reject }
};

export default useSubsidyListDetailMain;