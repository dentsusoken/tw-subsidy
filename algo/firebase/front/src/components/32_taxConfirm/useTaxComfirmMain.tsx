import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxVCRequestListState } from '@/lib/states/mockApp/taxVCRequestList';


import { createVerifiableMessage } from '@/lib/algosbt';

import { holderPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

const useTaxComfirmMain = () => {
    const input = useRecoilValue(taxInputState);
    const setList = useSetRecoilState(taxVCRequestListState);
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

    const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
    const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

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

    const onSubmit = () => {

        dayjs.locale('ja');
        const id = dayjs().unix();
        const now = dayjs();
        const applicationDate = dayjs(now).format('M月D日(ddd)');

        const content: TaxInputFormType = {
            ...input,
            id: id,
            applicationDate: applicationDate
        }
        if (!!holderDidAccountGlobal && !!issuerDidAccountGlobal) {
            setList((items) => [...items, createVerifiableMessage(
                holderDidAccountGlobal,
                issuerDidAccountGlobal.did,
                content,
                holderPw
            )]);
            reset();
        }

        router.push('/33_taxDone', '/33_taxDone');
    };

    const getBack = () => {
        router.push('/31_taxInput', '/31_taxInput');
    }

    return { methods, onSubmit, getBack }
};

export default useTaxComfirmMain;