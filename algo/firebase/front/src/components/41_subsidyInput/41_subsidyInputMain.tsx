import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';

const SubsidyInputMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
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
            applicationDate: ""
        },
    });

    const onSubmit = (data: SubsidyInputFormType) => {

        setInput(() => ({
            ...{
                id: 0,
                resident: data.resident,
                account: data.account,
                tax: data.tax,
                fullName: data.fullName,
                address: data.address,
                verifyStatus: false,
                approvalStatus: false,
                applicationDate: ""
            },
        }))
        router.push('/42_subsidyConfirm', '/42_subsidyConfirm');
    };

    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            <main>
                <Progress status={"input"} />
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Container>
                            <Container title={"申請書類の選択"}>
                                <ul className={"border-y border-li"}>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        <CheckBox<SubsidyInputFormType> label={"住民票"} name={"resident"} />
                                    </li>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex border-y border-li"}>
                                        <CheckBox<SubsidyInputFormType> label={"口座実在証明書"} name={"account"} />
                                    </li>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        <CheckBox<SubsidyInputFormType> label={"納税証明書"} name={"tax"} />
                                    </li>
                                </ul>
                            </Container>
                            <Container title={"申請者情報"}>
                                <div>
                                    <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                                </div>
                                <div>
                                    <InputArea<SubsidyInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                                </div>
                            </Container>
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

export default SubsidyInputMain;