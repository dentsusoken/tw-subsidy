import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useTaxListDetailMain from './useTaxListDetailMain';
import dayjs from 'dayjs';

const TaxListDetailMain = () => {
    const { VCRequest, methods, isIssuing, approve, back, verify, reject } = useTaxListDetailMain();
    dayjs.locale('ja');

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    {VCRequest &&
                        <section className={"flex flex-col items-center gap-1 w-72 mx-auto mb-2 pb-4 border-b"}>
                            {VCRequest.message.content.verifyStatus
                                ? <p className={"relative text-sm leading-relaxed"}><img src='/authenticated.svg' className={"absolute top-0 -translate-y-3 -translate-x-full"} />検証済</p>
                                : <p className={"relative text-sm leading-relaxed"}><img src='/warning.svg' className={"absolute -translate-x-full pr-2"} /> 要検証</p>
                            }
                            <p className={"text-sm text-color-gray-search leading-relaxed"}>{VCRequest.message.content.approvalStatus?"承認済":"未承認"}</p>
                            <p className={"text-xs text-color-gray-search leading-relaxed"}>申請日 {dayjs(VCRequest.message.content.applicationDate).format("YY/MM/DD HH:mm")}</p>
                        </section>
                    }
                    <Container>
                        <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} isEnabled={false} />
                        <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} isEnabled={false} />
                        <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} isEnabled={false} />
                        <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                        <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                    </Container>
                    <div className={"relative"}>
                        {isIssuing
                            ? <span className={"absolute right-5 -translate-y-3 text-sm leading-relaxed text-yellow-500"}>VC発行中...</span>
                            : null
                        }
                    </div>
                    <Container>
                        <div className="w-full pt-4 pb-2 px-5 flex justify-between">
                            <button
                                onClick={back}
                                className="input-form-button-white"
                            >
                                戻る
                            </button>
                            {
                                VCRequest && VCRequest.message.content.verifyStatus
                                    ? !VCRequest.message.content.approvalStatus&&
                                    <>
                                        <button
                                            onClick={reject}
                                            className="input-form-button-white"
                                        >
                                            却下
                                        </button>
                                        <button
                                            onClick={approve}
                                            className="input-form-button-blue"
                                        >
                                            承認
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={verify}
                                        className="input-form-button-blue"
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

export default TaxListDetailMain;