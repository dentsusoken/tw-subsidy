import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

const TaxConfirmMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const setList = useSetRecoilState(taxInputListState);
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

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

        const taxInput: TaxInputFormType = {
            ...input,
            id: id,
            applicationDate: applicationDate
        }
        setList((items) => [...items, taxInput]);
        reset();

        router.push('/33_taxDone', '/33_taxDone');
    };

    const back = () => {
        router.push('/31_taxInput', '/31_taxInput');
    }

    return (
        <>
            <Header title='納税証明証交付申請' currentUser={"applicant"} />
            <main>
                <Progress status={"confirm"} />
                <FormProvider {...methods} >
                    <Container>
                        <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} validation={{ min: 4, max: 4, pattern: /[0-9]{4}/, required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} validation={{ required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} validation={{ required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                        <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                        <TransitionArea>
                            <TransitionButton text='戻る' type={"prev"} currentUser={"applicant"} onClick={back} />
                            <TransitionButton text='申請' type={"next"} currentUser={"applicant"} onClick={onSubmit} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )
};

export default TaxConfirmMain;