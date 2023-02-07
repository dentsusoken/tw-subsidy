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
                {
                    VCListSelect?.resident.length === 0
                        ? <div className={"relative w-full text-center"}><span className={"absolute w-full left-0 -top-5 text-sm text-color-warnig"}>住民票紐付申請を実施してください。</span></div>
                        : null
                }
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Container>
                            <Container title={"申請書類の選択"} isRequred={true}>
                                <ul className={"mt-7 ml-3"}>
                                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                        {VCListSelect ?
                                            <div className={"relative w-[281px] h-[44px] px-2 border border-color-gray rounded-lg text-base"}>
                                                <label className={"absolute left-0 top-1/2 translate-x-2 -translate-y-1/2"}>住民票</label>
                                            </div>
                                            : null}
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