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
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

const SubsidyConfirmMain = () => {
    const [input, setInput] = useRecoilState(subsidyInputState);
    const setList = useSetRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
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

    const onSubmit = () => {

        dayjs.locale('ja');
        const id = dayjs().unix();
        const now = dayjs();
        const applicationDate = dayjs(now).format('M月D日(ddd)');

        const subsidyInput: SubsidyInputFormType = {
            ...input,
            id: id,
            applicationDate: applicationDate
        }
        setList((items) => [...items, subsidyInput]);
        reset();

        router.push('/43_subsidyDone', '/43_subsidyDone');
    };

    const back = () => {
        router.push('/41_subsidyInput', '/41_subsidyInput');
    }

    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            <main>
                <Progress status={"confirm"} />
                <FormProvider {...methods} >
                    <Container>
                        <Container title={"申請書類の選択"}>
                            <ul className={"border-y border-color-gainsboro"}>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <CheckBox<SubsidyInputFormType> label={"住民票"} name={"resident"} isEnabled={false} />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex border-y border-color-gainsboro"}>
                                    <CheckBox<SubsidyInputFormType> label={"口座実在証明書"} name={"account"} isEnabled={false} />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <CheckBox<SubsidyInputFormType> label={"納税証明書"} name={"tax"} isEnabled={false} />
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
                            <TransitionButton text='戻る' type={"prev"} currentUser={"applicant"} onClick={back} />
                            <TransitionButton text='申請' type={"next"} currentUser={"applicant"} onClick={onSubmit} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )
};

export default SubsidyConfirmMain;