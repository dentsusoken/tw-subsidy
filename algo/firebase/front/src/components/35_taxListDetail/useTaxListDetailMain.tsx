import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState, taxVCRequestListState, taxVCListState, VCListState } from '@/lib/states/mockApp';
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
    const setIssuedVCList = useSetRecoilState(VCListState);
    const [pathname, setPathName] = useState("")
    const [isIssuing, setIsIssuing] = useState(false)
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
            setIsIssuing(true);
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
                setIssuedVCList((items) => ({ ...items, tax: { VC: vc, acceptStatus: false } }));
                setIsIssuing(false);
                router.push({
                    pathname: '/36_taxListDone',
                    query: { proc: "approve" }
                }, '/36_taxListDone')
            }
        }
    };

    const reject = () => {
        // reset();

        router.push({
            pathname: '/36_taxListDone',
            query: { proc: "reject" }
        }, '/36_taxListDone')
    };

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }

    const revoke = () => {
        // const replaceData: TaxInputFormType = {
        //     ...input,
        //     approvalStatus: false,
        //     verifyStatus: false
        // }
        // const updateData = listState.map((item) => {
        //     if (item.message.content.id === replaceData.id) {
        //         return replaceData;
        //     }
        //     else {
        //         return item;
        //     }
        // })

        // setListState(updateData);
        // reset();

        router.push({
            pathname: "/52_taxListRevoked",
            query: { vc: "tax", proc: "delete" }
        }, "/52_taxListRevoked");
    }

    return { pathname, methods, isIssuing, approve, back, revoke, reject }
};

export default useTaxListDetailMain;