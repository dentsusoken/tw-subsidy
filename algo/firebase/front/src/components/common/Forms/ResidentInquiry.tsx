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
          <InputArea<ResidentInputFormType> label={"氏名"} name={"fullName"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label={"氏名フリガナ"} name={"fullNameFurigana"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label={"住所"} name={"address"} isEnabled={false} />
          <InputArea<ResidentInputFormType> label='住民となった年月' name='addressRegistDate' placeholder='' isEnabled={false} />
          <InputArea<ResidentInputFormType> label='本籍地' name="permanentAddress" placeholder='' isEnabled={false} />
        </section>
      </FormProvider>
    </>
  );
};

export default ResidentInquiry;
