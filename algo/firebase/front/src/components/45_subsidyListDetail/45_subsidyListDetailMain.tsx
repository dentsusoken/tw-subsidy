import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyListDetailMain from './useSubsidyListDetailMain';

const SubsidyListDetailMain = () => {
    const { methods, input, onSubmit, reject, verifyHandler } = useSubsidyListDetailMain()

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    <Container title={"申請内容照会"}>
                        <div className={"text-center h-12"}>
                            {
                                input.verifyStatus
                                    ? <p className={"text-sm pt-4"}><img src='/authenticated.svg' className={"inline -mx-2"} />検証済</p>
                                    : <p className={"text-sm  pt-7"}><img src='/warning.svg' className={"inline"} /> 要検証</p>
                            }
                        </div>
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
                            <TransitionButton text='却下' type={"prev"} currentUser={"approver"} onClick={reject} />
                            {input.verifyStatus ? null : <TransitionButton text='検証' type={"verify"} currentUser={"approver"} onClick={verifyHandler} />}
                            <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={onSubmit} isEnabled={input.verifyStatus} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )

};

export default SubsidyListDetailMain;