import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useTaxInputMain from './useTaxInputMain';
import Loading from '../common/Loading';

const TaxInputMain = () => {
    const { methods, residentVC, isEnable, onSubmit, isLoading } = useTaxInputMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"input"} />
                {
                    !residentVC && !isLoading
                        ? <div className={"relative w-full text-center"}><span className={"absolute w-full left-0 -top-5 text-sm text-color-warnig"}>住民票紐付申請を実施してください。</span></div>
                        : null
                }
                {!isLoading &&
                    <FormProvider {...methods} >
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Container>
                                <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} placeholder={"2023"} validation={{ pattern: /[0-9]{4}/ }} isRequired={true} />
                                <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} isRequired={true} />
                                <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} isRequired={true} />
                                <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={isEnable} />
                                <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={isEnable} />
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

export default TaxInputMain;