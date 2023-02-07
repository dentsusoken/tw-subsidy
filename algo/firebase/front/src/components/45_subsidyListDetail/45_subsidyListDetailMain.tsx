import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyListDetailMain from './useSubsidyListDetailMain';
import dayjs from 'dayjs';

const SubsidyListDetailMain = () => {
    const { methods, input, onSubmit, reject, verifyHandler, back, isIssuing } = useSubsidyListDetailMain()
    dayjs.locale('ja');

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    <Container>
                        <div>
                            {input &&
                                <section className={"flex flex-col items-center gap-1 w-72 mx-auto mb-2 pb-4 border-b"}>
                                    {input.verifyStatus
                                        ? <p className={"relative text-sm leading-relaxed"}><img src='/authenticated.svg' className={"absolute top-0 -translate-y-3 -translate-x-full"} />検証済</p>
                                        : <p className={"relative text-sm leading-relaxed"}><img src='/warning.svg' className={"absolute -translate-x-full pr-2"} /> 要検証</p>
                                    }
                                    <p className={"text-sm text-color-gray-search leading-relaxed"}>{input.approvalStatus?"承認済":"未承認"}</p>
                                    <p className={"text-xs text-color-gray-search leading-relaxed"}>申請日 {dayjs(input.applicationDate).format("YY/MM/DD HH:mm")}</p>
                                </section>
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
                        <div className={"relative"}>
                            {isIssuing
                                ? <span className={"absolute right-5 -translate-y-3 text-sm leading-relaxed text-yellow-500"}>承認中...</span>
                                : null
                            }
                        </div>
                        <div className="w-full pt-4 pb-2 px-5 flex justify-between">
                            <button
                                onClick={back}
                                className="input-form-button-white"
                            >
                                戻る
                            </button>
                            {
                                input && input.verifyStatus
                                    ? <>
                                        <button
                                            onClick={reject}
                                            className="input-form-button-white"
                                        >
                                            却下
                                        </button>
                                        <button
                                            onClick={onSubmit}
                                            className="input-form-button-orange"
                                        >
                                            承認
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={verifyHandler}
                                        className="input-form-button-orange"
                                    >
                                        検証
                                    </button>
                            }
                        </div>
                    </Container>
                </FormProvider>
            </main>

        </>
    )

};

export default SubsidyListDetailMain;