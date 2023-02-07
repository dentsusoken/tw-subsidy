import { FormProvider, useForm } from 'react-hook-form';

import InputArea from '@/components/common/InputArea';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import Container from '../../common/Container';

export type SubsidyInquiryParams = {
    input: SubsidyInputFormType;
}

const SubsidyInquiry = ({ input }: SubsidyInquiryParams) => {
    const methods = useForm<SubsidyInputFormType>({
        defaultValues: {
            resident: input.resident,
            account: input.account,
            tax: input.tax,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
        },
    });

    return (
        <>
            <FormProvider {...methods} >
                <Container title={"申請書類の選択"}>
                    <ul className={"mt-7 ml-3"}>
                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                            <input type="text"
                                className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                disabled={true}
                                value={`住民票 - VC${parseInt(input.resident) + 1}`}
                            />
                        </li>
                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                            <input type="text"
                                className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                disabled={true}
                                value={`口座実在証明証 - VC${parseInt(input.account) + 1}`}
                            />
                        </li>
                        <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                            <input type="text"
                                className={"w-[281px] h-[44px] px-2 rounded-lg text-base bg-color-disabled"}
                                disabled={true}
                                value={`納税証明書 - VC${parseInt(input.tax) + 1}`}
                            />
                        </li>
                    </ul>
                </Container>
                <Container title={"申請者情報"}>
                    <div className={"mt-7 ml-3"}>
                        <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                        <InputArea<SubsidyInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                    </div>
                </Container>
            </FormProvider>
        </>
    )
};

export default SubsidyInquiry;