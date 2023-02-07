import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyConfirmMain from './useSubsidyConfirmMain';

const SubsidyConfirmMain = () => {
    const { methods, input, onSubmit, back } = useSubsidyConfirmMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"confirm"} />
                <FormProvider {...methods} >
                    <Container>
                        <Container title={"申請書類の選択"}>
                            <ul className={"mt-7 ml-3"}>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`住民票 - VC${input.resident ? parseInt(input.resident) + 1 : 0}`}
                                    />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`口座実在証明証 - VC${input.account ? parseInt(input.account) + 1 : 0}`}
                                    />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`納税証明書 - VC${input.tax ? parseInt(input.tax) + 1 : 0}`}
                                    />
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