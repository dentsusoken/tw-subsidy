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
    const { pathname, methods, onSubmit, back } = useSubsidyListDetailMain()

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    <Container title={"申請内容照会"}>
                        <div className={"text-center pt-7"}>
                            {(pathname == '/35_taxListDetail')
                                ? null
                                :
                                <span className={"text-sm leading-relaxed text-color-grey-accepted"}>2022年12月20日 承認済</span>
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
                            <TransitionButton text='戻る' type={"prev"} currentUser={"approver"} onClick={back} />
                            <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={onSubmit} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )

};

export default SubsidyListDetailMain;