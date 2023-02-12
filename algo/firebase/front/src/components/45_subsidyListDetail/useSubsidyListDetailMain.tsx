import { Algodv2 } from 'algosdk';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, SubsidyVCRequestType, VPContent } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { getAlgod } from '@/lib/algo/algod/algods';
import { createVerifiableCredential, verifyVerifiablePresentation } from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';
import { useErrorHandler } from 'react-error-boundary';
import { issuerPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import { VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useSubsidyListDetailMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    const [isIssuing, setIsIssuing] = useState(false);
    const [residentVerifyStatus, setResidentVerifyStatus] = useState(false);
    const [accountVerifyStatus, setAccountVerifyStatus] = useState(false);
    const [taxVerifyStatus, setTaxVerifyStatus] = useState(false);
    const setVCList = useSetRecoilState(VCListState);
    const router = useRouter();
    const [VCRequest, setVCRequest] = useState<SubsidyInputFormType>()
    const errorHandler = useErrorHandler();
    const [chain] = useRecoilState(chainState);
    const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
    const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

    dayjs.locale('ja');

    useEffect(() => {
        try {
            (async () => {
                verifyHandler();
                const VCRequest = listState.find((v) => v.id === input.id);
                if (VCRequest) {
                    setVCRequest(VCRequest);
                }
            })();
        } catch (e) {
            errorHandler(e);
        }
    }, [chain])



    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            residentVC: input.residentVC,
            accountVC: input.accountVC,
            taxVC: input.taxVC,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
        },
    });

    const VPVerify = async (algod: Algodv2, VP: VerifiableMessage<VPContent> | undefined) => {
        try {
            let verify = false
            if (VP) {
                verify = await verifyVerifiablePresentation(algod, VP);
            }
            else {
                verify = true;
            }
            return verify
        } catch (e) {
            throw e;
        }
    }

    const verifyHandler = async () => {
        try {
            if (input) {
                const algod = getAlgod(chain);

                let residentVerifyStatus = false;
                let accountVerifyStatus = false;
                let taxVerifyStatus = false;

                residentVerifyStatus = await VPVerify(algod, input.residentVP);
                accountVerifyStatus = await VPVerify(algod, input.accountVP);
                taxVerifyStatus = await VPVerify(algod, input.taxVP);

                setResidentVerifyStatus(residentVerifyStatus);
                setAccountVerifyStatus(accountVerifyStatus);
                setTaxVerifyStatus(taxVerifyStatus);

                if (residentVerifyStatus && accountVerifyStatus && taxVerifyStatus) {
                    const replaceData: SubsidyInputFormType = {
                        ...input,
                        verifyStatus: true,
                    }
                    setInput(replaceData)

                    const updateData = listState.map((item) => {
                        if (item.id === replaceData.id) {
                            return replaceData;
                        }
                        else {
                            return item;
                        }
                    })
                    setListState(updateData);
                }
            }
        } catch (e) {
            errorHandler(e);
        }
    }

    const onSubmit = async () => {
        try {
            setIsIssuing(() => true);
            const algod = getAlgod(chain);
            if (!input.approvalStatus && issuerDidAccountGlobal && holderDidAccountGlobal) {

                if (input.verifyStatus) {
                    const replaceData: SubsidyInputFormType = { ...input, approvalStatus: true, issueDate: dayjs().format('YYYY-MM-DD HH:mm:ss') }

                    const updateData = listState.map((item) => {
                        if (item.id === replaceData.id) {
                            return replaceData;
                        }
                        else {
                            return item;
                        }
                    })
                    const vc = await createVerifiableCredential(
                        algod,
                        issuerDidAccountGlobal,
                        holderDidAccountGlobal.did,
                        replaceData,
                        issuerPw
                    );
                    setInput(replaceData)
                    setListState(updateData);
                    setVCList((items) => ({ ...items, subsidy: [...items.subsidy, vc] }));
                }
            }
            setIsIssuing(() => false);
            router.push({
                pathname: '/46_subsidyListDone',
                query: { proc: "approve" }
            }, '/46_subsidyListDone');
        } catch (e) {
            errorHandler(e);
        }
    };

    const reject = () => {
        router.push({
            pathname: '/46_subsidyListDone',
            query: { proc: "reject" }
        }, '/46_subsidyListDone')
    };

    const back = () => {
        router.push('/44_subsidyList')
    };
    // verifyHandler();

    return { methods, input, VCRequest, onSubmit, reject, verifyHandler, back, isIssuing, residentVerifyStatus, accountVerifyStatus, taxVerifyStatus }
};

export default useSubsidyListDetailMain;