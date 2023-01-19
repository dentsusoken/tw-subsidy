import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { SubsidyInputFormType, VPContent } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

import { VerifiableCredential, DidAccount } from '@/lib/algosbt/types';
import { createVerifiableMessage } from '@/lib/algosbt';
import { VCListState } from '@/lib/states/mockApp';
import { holderPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import verifierDidAccountState from '@/lib/states/verifierDidAccountState';

const useSubsidyConfirmMain = () => {
    const input = useRecoilValue(subsidyInputState);
    const setList = useSetRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
    const VCListGlobal = useRecoilValue(VCListState);
    const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
    const [verifierDidAccountGlobal] = useRecoilState(verifierDidAccountState);
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

    const createVPContent = (vc: VerifiableCredential) => {
        const content: VPContent = {
            credentials: [vc],
        };
        return content;
    };

    const createVPMessage = (
        content: VPContent,
        holderDidAccount: DidAccount,
        verifierDid: string
    ) => {
        return createVerifiableMessage(
            holderDidAccount,
            verifierDid,
            content,
            holderPw
        );
    };

    const onSubmit = async () => {
        if (holderDidAccountGlobal && verifierDidAccountGlobal) {
            dayjs.locale('ja');
            const id = dayjs().unix();
            const now = dayjs();
            const applicationDate = dayjs(now).format('M月D日(ddd)');

            const subsidyInput: SubsidyInputFormType = {
                ...input,
                id: id,
                applicationDate: applicationDate,
            }

            if (VCListGlobal.resident) {
                const content = createVPContent(VCListGlobal.resident[parseInt(input.resident)].VC);
                const vm = createVPMessage(
                    content,
                    holderDidAccountGlobal,
                    verifierDidAccountGlobal.did
                );

                subsidyInput.residentVP = vm;
            }
            if (VCListGlobal.account) {
                const content = createVPContent(VCListGlobal.account[parseInt(input.account)].VC);
                const vm = createVPMessage(
                    content,
                    holderDidAccountGlobal,
                    verifierDidAccountGlobal.did
                );
                subsidyInput.accountVP = vm;
            }
            if (VCListGlobal.tax) {
                const content = createVPContent(VCListGlobal.tax[parseInt(input.tax)].VC);
                const vm = createVPMessage(
                    content,
                    holderDidAccountGlobal,
                    verifierDidAccountGlobal.did
                );
                subsidyInput.taxVP = vm;
            }
            setList((items) => [...items, subsidyInput]);
            reset();

            router.push('/43_subsidyDone', '/43_subsidyDone');
        }
    };

    const back = () => {
        router.push('/41_subsidyInput', '/41_subsidyInput');
    }

    return { methods, input, onSubmit, back }
};

export default useSubsidyConfirmMain;