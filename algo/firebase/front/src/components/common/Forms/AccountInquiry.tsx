import { FormProvider, useForm } from 'react-hook-form';

import InputArea from '@/components/common/InputArea';

import { AccountInputFormType } from '@/lib/types/mockApp';


export type AccountInquiryParams = {
    input: AccountInputFormType
}

const AccountInquiry = ({ input }: AccountInquiryParams) => {

    const methods = useForm<AccountInputFormType>({
        defaultValues: {
            bankCode: input.bankCode,
            branchNumber: input.branchNumber,
            accountNumber: input.accountNumber,
            corporateName: input.corporateName,
            applicantName: input.applicantName,
            applicantAddress: input.applicantAddress,
        },
    });

    return (
        <>
            <FormProvider {...methods} >
                <section>
                    <InputArea<AccountInputFormType> label={"金融機関コード"} name={"bankCode"} isEnabled={false} size={"small"} />
                    <InputArea<AccountInputFormType> label={"支店番号"} name={"branchNumber"} isEnabled={false} size={"small"} />
                    <InputArea<AccountInputFormType> label={"口座番号"} name={"accountNumber"} isEnabled={false} />
                    <InputArea<AccountInputFormType> label={"法人名称"} name={"corporateName"} placeholder='' isEnabled={false} />
                    <InputArea<AccountInputFormType> label={"申請者名"} name={"applicantName"} placeholder='' isEnabled={false} />
                    <InputArea<AccountInputFormType> label={"申請住所"} name={"applicantAddress"} placeholder='' isEnabled={false} />
                </section>
            </FormProvider>
        </>
    );
};

export default AccountInquiry;
