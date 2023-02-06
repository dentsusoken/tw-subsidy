import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState, taxVCRequestListState, taxVCListState, VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';

import { verifyVerifiableMessage, createVerifiableCredential, createVerifiableMessage } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { holderPw, issuerPw } from '@/lib/algo/account/accounts';
import { useErrorHandler } from 'react-error-boundary';

const useTaxListDetailMain = () => {
    const input = useRecoilValue(taxInputState);
    const [listState, setListState] = useRecoilState(taxVCRequestListState);
    const setVCList = useSetRecoilState(taxVCListState);
    const setIssuedVCList = useSetRecoilState(VCListState);
    const [pathname, setPathName] = useState("")
    const [isIssuing, setIsIssuing] = useState(false)
    const router = useRouter();
    const errorHandler = useErrorHandler();

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

    const verify = () => {
        try {
            if (VCRequest && holderDidAccountGlobal && issuerDidAccountGlobal) {
                const verified = verifyVerifiableMessage(VCRequest);
                const replaceData = { ...VCRequest.message.content, verifyStatus: verified }
                const updateData = listState.map((item) => {
                    if (item.message.content.id === replaceData.id) {
                        return createVerifiableMessage(
                            holderDidAccountGlobal,
                            issuerDidAccountGlobal.did,
                            replaceData,
                            holderPw
                        );
                    }
                    else {
                        return item;
                    }
                });
                setListState(() => updateData);
            }
        } catch (e) {
            errorHandler(e);
        }
    }


    const approve = async () => {
        try {
            if (VCRequest && holderDidAccountGlobal && issuerDidAccountGlobal) {
                setIsIssuing(true);

                if (VCRequest.message.content.verifyStatus) {
                    const algod = getAlgod(chainType);
                    dayjs.locale('ja');
                    const now = dayjs();
                    const content = VCRequest.message.content;
                    const vcContent = {
                        ...content,
                        approvalStatus: true,
                        issueDate: dayjs(now).format('YYYY-MM-DD HH:mm:ss')
                    };
                    const vc = await createVerifiableCredential(
                        algod,
                        issuerDidAccountGlobal,
                        holderDidAccountGlobal.did,
                        vcContent,
                        issuerPw
                    );
                    const updateData = listState.map((item) => {
                        if (item.message.content.id === vcContent.id) {
                            return createVerifiableMessage(
                                holderDidAccountGlobal,
                                issuerDidAccountGlobal.did,
                                vcContent,
                                holderPw
                            );
                        }
                        else {
                            return item;
                        }
                    });
                    setListState(() => updateData);
                    setVCList((items) => [...items, vc]);
                    setIssuedVCList((items) => ({ ...items, tax: [...items.tax, vc] }));
                    setIsIssuing(false);
                    router.push({ pathname: "/36_taxListDone", query: { id: router.query.id, proc: "approve" } });
                }
            }
        } catch (e) {
            setIsIssuing(false);
            errorHandler(e);
        }
    };

    const reject = () => {
        router.push({ pathname: "/36_taxListDone", query: { id: router.query.id, proc: "reject" } });
    }

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }



    return { VCRequest, methods, isIssuing, approve, back, verify, reject }
};

export default useTaxListDetailMain;