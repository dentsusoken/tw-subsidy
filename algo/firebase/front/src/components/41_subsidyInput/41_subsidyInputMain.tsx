import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';
import VCSelect from '../common/VCSelect';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyInputMain from './useSubsidyInputMain';

const SubsidyInputMain = () => {
    const { methods, input, onSubmit, VCListSelect, isEnable } = useSubsidyInputMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"input"} />
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Container>
                            <Container title={"申請書類の選択"} isRequred={true}>
                                <ul className={"mt-7 ml-3"}>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        {VCListSelect ? <VCSelect<SubsidyInputFormType> label={"住民票"} name={"resident"} items={VCListSelect.resident} currentVal={input.resident} /> : null}
                                    </li>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        {VCListSelect ? <VCSelect<SubsidyInputFormType> label={"口座実在証明書"} name={"account"} items={VCListSelect.account} currentVal={input.resident} /> : null}
                                    </li>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        {VCListSelect ? <VCSelect<SubsidyInputFormType> label={"納税証明書"} name={"tax"} items={VCListSelect.tax} currentVal={input.resident} /> : null}
                                    </li>
                                </ul>
                            </Container>
                            <Container title={"申請者情報"}>
                                <div className={"mt-7 ml-3"}>
                                    <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={isEnable} />
                                    <InputArea<SubsidyInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={isEnable} />
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