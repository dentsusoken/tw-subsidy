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
                        <TransitionArea>
                            <TransitionButton text='却下' type={"prev"} currentUser={"approver"} onClick={reject} />
                            <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={approve} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )
};

export default TaxListDetailMain;