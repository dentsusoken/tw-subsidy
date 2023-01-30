import { Algodv2 } from 'algosdk';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { SubsidyInputFormType, VPContent } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiablePresentation } from '@/lib/algosbt';
import chainState from '@/lib/states/chainState';
import { VerifiableMessage } from '@/lib/algosbt/types';

const useSubsidyListDetailMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    const router = useRouter();
    const [chain] = useRecoilState(chainState);

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

    const VPVerify = async (algod: Algodv2, VP: VerifiableMessage<VPContent> | undefined) => {
        let verify = false
        if (VP) {
            verify = await verifyVerifiablePresentation(algod, VP);
        }
        else {
            verify = true;
        }
        return verify
    }

    const verifyHandler = async () => {
        const algod = getAlgod(chain);

        let residentVerifyStatus = false;
        let accountVerifyStatus = false;
        let taxVerifyStatus = false;

        residentVerifyStatus = await VPVerify(algod, input.residentVP);
        accountVerifyStatus = await VPVerify(algod, input.accountVP);
        taxVerifyStatus = await VPVerify(algod, input.taxVP);

        if (residentVerifyStatus && accountVerifyStatus && taxVerifyStatus) {
            const replaceData: SubsidyInputFormType = { ...input, verifyStatus: true }
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

    const onSubmit = async () => {
        if (!input.approvalStatus) {

            if (input.verifyStatus) {
                const replaceData: SubsidyInputFormType = { ...input, approvalStatus: true }
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

    return { methods, input, onSubmit, reject, verifyHandler }
};

export default useSubsidyListDetailMain;