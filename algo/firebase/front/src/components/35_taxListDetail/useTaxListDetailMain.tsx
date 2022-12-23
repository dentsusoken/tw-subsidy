import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';
import { useEffect, useState } from 'react';

const useTaxListDetailMain = () => {
    const input = useRecoilValue(taxInputState);
    const [listState, setListState] = useRecoilState(taxInputListState);
    const [pathname, setPathName] = useState("")
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

    useEffect(() => {
        setPathName(router.pathname);
    })


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

    const approve = () => {

        const replaceData: TaxInputFormType = {
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
            pathname: '/36_taxListDone',
            query: { proc: "approve" }
        }, '/36_taxListDone')
    };

    const reject = () => {
        reset();

        router.push({
            pathname: '/36_taxListDone',
            query: { proc: "reject" }
        }, '/36_taxListDone')
    };

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }

    const revoke = () => {
        const replaceData: TaxInputFormType = {
            ...input,
            approvalStatus: false,
            verifyStatus: false
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
            pathname: "/52_taxListRevoked",
            query: { proc: "delete" }
        }, "/52_taxListRevoked");
    }

    return { pathname, methods, approve, back, revoke, reject }
};

export default useTaxListDetailMain;