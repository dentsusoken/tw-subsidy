import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useTaxListDetailMain from './useTaxListDetailMain';

const TaxListDetailMain = () => {
    const { pathname, methods, isIssuing, approve, back, revoke, reject } = useTaxListDetailMain();

    return (
        <>
            <Header />
            <main>
                <FormProvider {...methods} >
                    <Container title='申請内容照会'>
                        <div className={"text-center pt-7 relative"}>
                            {isIssuing
                                ? <span className={"absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-relaxed text-yellow-500"}>VC発行中...</span>
                                : null
                            }
                            {(pathname == '/35_taxListDetail')
                                ? null
                                :
                                <span className={"absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-relaxed text-color-grey-accepted"}>2022年12月20日 承認済</span>
                            }
                        </div>
                        <Container>
                            <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} validation={{ min: 4, max: 4, pattern: /[0-9]{4}/, required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} validation={{ required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} validation={{ required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                            <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                        </Container>
                        <TransitionArea>
                            {(pathname == '/35_taxListDetail')
                                ? (
                                    <>
                                        <TransitionButton text='却下' type={"prev"} currentUser={"approver"} onClick={reject} />
                                        <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={approve} />
                                    </>
                                )
                                : (
                                    <>
                                        <TransitionButton text='戻る' type={"prev"} currentUser={"approver"} onClick={back} />
                                        <TransitionButton text='承認取消' type={"warnig"} currentUser={"approver"} onClick={revoke} />
                                    </>
                                )
                            }
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )
};

export default TaxListDetailMain;