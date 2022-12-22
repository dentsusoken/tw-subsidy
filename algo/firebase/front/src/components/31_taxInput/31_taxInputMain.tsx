import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';

const TaxInputMain = () => {
    const [input, setInput] = useRecoilState(taxInputState);
    const router = useRouter();

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            // fullName: input.fullName,
            fullName: "山田太郎",
            // address: input.address,
            address: "東京都渋谷区xxxxxx",
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = (data: TaxInputFormType) => {

        setInput(() => ({
            ...{
                id: 0,
                applicationYear: data.applicationYear,
                corporationName: data.corporationName,
                corporationAddress: data.corporationAddress,
                fullName: data.fullName,
                address: data.address,
                applicationDate: "",
                verifyStatus: false,
                approvalStatus: false,
            },
        }))
        router.push('/32_taxConfirm', '/32_taxConfirm');
    };

    return (
        <>
            <Header title='納税証明証交付申請' currentUser={"applicant"} />
            <main>
                <Progress status={"input"} />
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Container>
                            <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} placeholder={"2023"} validation={{ pattern: /[0-9]{4}/, required: true }} isRequired={true} />
                            <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} validation={{ required: true }} isRequired={true} />
                            <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} validation={{ required: true }} isRequired={true} />
                            <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                            <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                            <TransitionArea>
                                <TransitionButton text='確認' type={"next"} currentUser={"applicant"} />
                            </TransitionArea>
                        </Container>
                    </form>
                </FormProvider>
            </main>

        </>
    )
};

export default TaxInputMain;