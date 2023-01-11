import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useTaxComfirmMain from './useTaxComfirmMain';

const TaxConfirmMain = () => {
    const { methods, onSubmit, getBack } = useTaxComfirmMain()

    return (
        <>
            <Header />
            <main>
                <Progress status={"confirm"} />
                <FormProvider {...methods} >
                    <Container>
                        <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} isEnabled={false} validation={{ min: 4, max: 4, pattern: /[0-9]{4}/, required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} isEnabled={false} validation={{ required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} isEnabled={false} validation={{ required: true }} isRequired={true} />
                        <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                        <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                        <TransitionArea>
                            <TransitionButton text='戻る' type={"prev"} currentUser={"applicant"} onClick={getBack} />
                            <TransitionButton text='申請' type={"next"} currentUser={"applicant"} onClick={onSubmit} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )
};

export default TaxConfirmMain;