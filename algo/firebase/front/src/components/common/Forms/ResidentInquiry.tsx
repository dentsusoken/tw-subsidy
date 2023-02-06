import { FormProvider, useForm } from 'react-hook-form';

import InputArea from '@/components/common/InputArea';

import { ResidentInputFormType } from '@/lib/types/mockApp';


export type ResidentInquiryParams = {
  input: ResidentInputFormType
}

const ResidentInquiry = ({ input }: ResidentInquiryParams) => {

  const methods = useForm<ResidentInputFormType>({
    defaultValues: {
      fullName: input.fullName,
      fullNameFurigana: input.fullNameFurigana,
      address: input.address,
      addressRegistDate: input.addressRegistDate,
      permanentAddress: input.permanentAddress,
    },
  });

  return (
    <>
      <FormProvider {...methods} >
        <section>
          <InputArea<ResidentInputFormType> label={"申請年度"} name={"fullName"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label={"法人名称"} name={"fullNameFurigana"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label={"所在地"} name={"address"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label='申請者名' name='addressRegistDate' placeholder='' isEnabled={false} />
          <InputArea<ResidentInputFormType> label='申請者住所' name="permanentAddress" placeholder='' isEnabled={false} />
        </section>
      </FormProvider>
    </>
  );
};

export default ResidentInquiry;
