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
import Loading from '../common/Loading';

const SubsidyInputMain = () => {
    const { methods, input, onSubmit, isEnable, residentList, accountList, taxList, isLoading } = useSubsidyInputMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"input"} />
                {
                    !isLoading && !residentList[residentList.length - 1]
                        ? <div className={"relative w-full text-center"}><span className={"absolute w-full left-0 -top-5 text-sm text-color-warnig"}>住民票紐付申請を実施してください。</span></div>
                        : null
                }
                {!isLoading &&
                    <FormProvider {...methods} >
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Container>
                                <Container title={"申請書類の選択"} isRequred={true}>
                                    <ul className={"mt-7 ml-3"}>
                                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                            <div className={"relative w-[281px] h-[44px] px-2 border border-color-gray rounded-lg text-base"}>
                                                {residentList[residentList.length - 1]
                                                    ? <label className={"absolute left-0 top-1/2 translate-x-2 -translate-y-1/2"}>住民票 - VC{residentList.length}</label>
                                                    : <label className={"absolute left-0 top-1/2 translate-x-2 -translate-y-1/2"}>住民票 - VC0</label>
                                                }
                                            </div>
                                        </li>
                                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                            <VCSelect<SubsidyInputFormType> label={"口座実在証明書"} name={"accountVC"} items={accountList} currentVal={input.accountVC} />
                                        </li>
                                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                            <VCSelect<SubsidyInputFormType> label={"納税証明書"} name={"taxVC"} items={taxList} currentVal={input.taxVC} />
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
                }
                <Loading isLoading={isLoading} />
            </main>

        </>
    )
};

export default SubsidyInputMain;