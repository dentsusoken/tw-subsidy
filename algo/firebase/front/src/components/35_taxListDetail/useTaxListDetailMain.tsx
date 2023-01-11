import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState, taxInputListState, taxVCRequestListState, taxVCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';

import { verifyVerifiableMessage, createVerifiableCredential } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { issuerPw } from '@/lib/algo/account/accounts';

const useTaxListDetailMain = () => {
    const input = useRecoilValue(taxInputState);
    const [listState, setListState] = useRecoilState(taxVCRequestListState);
    const setVCList = useSetRecoilState(taxVCListState);
    const [pathname, setPathName] = useState("")
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

    const [chainType] = useRecoilState(chainState);
    const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
    const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

    const VCRequest = listState.find((v) => v.message.content.id === input.id);

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

    const approve = async () => {
        if (VCRequest && holderDidAccountGlobal && issuerDidAccountGlobal) {
            const verified = verifyVerifiableMessage(VCRequest);
            if (verified) {
                const algod = getAlgod(chainType);
                const content = VCRequest.message.content;
                const vcContent = {
                    ...content,
                    verifyStatus: true,
                    approvalStatus: true,
                };
                const vc = await createVerifiableCredential(
                    algod,
                    issuerDidAccountGlobal,
                    holderDidAccountGlobal.did,
                    vcContent,
                    issuerPw
                );
                setListState((items) => items.filter((item) => item.message.content.id != content.id));
                setVCList((items) => [...items, vc]);
                
                router.push({
                    pathname: '/36_taxListDone',
                    query: { proc: "approve" }
                }, '/36_taxListDone')
            }
        }
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
        // const updateData = listState.map((item) => {
        //     if (item.message.content.id === replaceData.id) {
        //         return replaceData;
        //     }
        //     else {
        //         return item;
        //     }
        // })

        // setListState(updateData);
        reset();

        router.push({
            pathname: "/52_taxListRevoked",
            query: { vc: "tax", proc: "delete" }
        }, "/52_taxListRevoked");
    }

    return { pathname, methods, approve, back, revoke, reject }
};

export default useTaxListDetailMain;