import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyConfirmMain from './useSubsidyConfirmMain';

const SubsidyConfirmMain = () => {
        const { methods, onSubmit, back } = useSubsidyConfirmMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"confirm"} />
                <FormProvider {...methods} >
                    <Container>
                        <Container title={"申請書類の選択"}>
                            <ul className={"border-y border-color-gainsboro mt-7 ml-3"}>
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
                            <div className={"mt-7 ml-3"}>
                                <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
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