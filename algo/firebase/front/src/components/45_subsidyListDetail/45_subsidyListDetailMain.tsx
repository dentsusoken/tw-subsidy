import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import useSubsidyListDetailMain from './useSubsidyListDetailMain';
import dayjs from 'dayjs';

const SubsidyListDetailMain = () => {
    const { methods, VCRequest, onSubmit, reject, verifyHandler, back, isIssuing } = useSubsidyListDetailMain()
    dayjs.locale('ja');

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    <Container>
                        <div>
                            {VCRequest &&
                                <section className={"flex flex-col items-center gap-1 w-72 mx-auto mb-2 pb-4 border-b"}>
                                    {VCRequest.verifyStatus
                                        ? <p className={"relative text-sm text-color-gray-search leading-relaxed"}><img src='/authenticated.svg' className={"absolute top-0 -translate-y-3 -translate-x-full"} />検証済</p>
                                        : <p className={"relative text-sm leading-relaxed"}><img src='/warning.svg' className={"absolute -translate-x-full pr-2"} /> 要検証</p>
                                    }

                                    {VCRequest.approvalStatus
                                        ? <p className={"relative text-sm text-color-gray-search leading-relaxed"}><img src='/authenticated.svg' className={"absolute top-0 -translate-y-3 -translate-x-full"} />承認済</p>
                                        : <p className={"text-sm text-color-required leading-relaxed"}>未承認</p>
                                    }
                                    <p className={"text-xs text-color-gray-search leading-relaxed"}>申請日 {dayjs(VCRequest.applicationDate).format("YY/MM/DD HH:mm")}</p>
                                </section>
                            }
                        </div>
                        <Container title={"申請書類の選択"}>
                            {VCRequest && <ul className={"mt-7 ml-3"}>
                                <li className={"py-3 pl-4 pr-6 w-78 flex relative"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`住民票 - VC${parseInt(VCRequest.resident) + 1}`}
                                    />
                                    {VCRequest.residentVerifyStatus
                                        ? <img src='/authenticated.svg' className={"absolute top-0 right-0 -translate-x-1/2 translate-y-2"} />
                                        : <img src='/warning.svg' className={"absolute top-0 right-0 -translate-x-full translate-y-full pr-2"} />
                                    }
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex relative"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`口座実在証明証 - VC${parseInt(VCRequest.account) + 1}`}
                                    />
                                    {VCRequest.accountVerifyStatus
                                        ? <img src='/authenticated.svg' className={"absolute top-0 right-0 -translate-x-1/2 translate-y-2"} />
                                        : <img src='/warning.svg' className={"absolute top-0 right-0 -translate-x-full translate-y-full pr-2"} />
                                    }
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex relative"}>
                                    <input type="text"
                                        className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                        disabled={true}
                                        value={`納税証明書 - VC${parseInt(VCRequest.tax) + 1}`}
                                    />
                                    {VCRequest.taxVerifyStatus
                                        ? <img src='/authenticated.svg' className={"absolute top-0 right-0 -translate-x-1/2 translate-y-2"} />
                                        : <img src='/warning.svg' className={"absolute top-0 right-0 -translate-x-full translate-y-full pr-2"} />
                                    }
                                </li>
                            </ul>
                            }
                        </Container>
                        <Container title={"申請者情報"}>
                            <div className={"mt-7 ml-3"}>
                                <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                                <InputArea<SubsidyInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                            </div>
                        </Container>
                        <div className={"w-70 mx-auto relative"}>
                            {isIssuing
                                ? <span className={"absolute right-0 -translate-y-1/2 text-sm leading-relaxed text-yellow-500"}>VC発行中...</span>
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
                                VCRequest && VCRequest.verifyStatus
                                    ? !VCRequest.approvalStatus &&
                                    <>
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