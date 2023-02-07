import { FormProvider, useForm } from 'react-hook-form';

import InputArea from '@/components/common/InputArea';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';

export type TaxInquiryParams = {
    input: TaxInputFormType;
}

const TaxInquiry = ({ input }: TaxInquiryParams) => {

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            fullName: input.fullName,
            address: input.address,
        },
    });

    return (
        <>
            <FormProvider {...methods} >
                <section>
                    <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} isEnabled={false} />
                    <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} isEnabled={false} />
                    <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} isEnabled={false} />
                    <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                    <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                </section>
            </FormProvider>
        </>
    )
};

export default TaxInquiry;