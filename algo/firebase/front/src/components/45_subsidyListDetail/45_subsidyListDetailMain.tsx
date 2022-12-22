import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import CheckBox from '@/components/common/CheckBox';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';

const SubsidyListDetailMain = () => {
    const input = useRecoilValue(subsidyInputState);
    const [listState, setListState] = useRecoilState(subsidyListState);
    const reset = useResetRecoilState(subsidyInputState);
    const router = useRouter();

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

    const onSubmit = () => {

        const replaceData: SubsidyInputFormType = {
            ...input,
            verifyStatus: true,
            approvalStatus: true,
        }

        const updateData = listState.map((item) => {
            if (item.id === replaceData.id) {
                return replaceData;
            }
            else {
                return item;
            }
        })

        setListState(updateData);
        reset();

        router.push({
            pathname:'/46_subsidyListDone',
            query:{proc: "approve"}
        }, '/46_subsidyListDone');
    };

    const back = () => {
        router.push('/44_subsidyList', '/44_subsidyList');
    }

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <main>
                <FormProvider {...methods} >
                    <Container title={"申請内容照会"}>
                        <Container title={"申請書類の選択"}>
                            <ul className={"border-y border-color-gainsboro"}>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <CheckBox<SubsidyInputFormType> label={"住民票"} name={"resident"} isEnabled={false} />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex border-y border-color-gainsboro"}>
                                    <CheckBox<SubsidyInputFormType> label={"口座実在証明書"} name={"account"} isEnabled={false} />
                                </li>
                                <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                                    <CheckBox<SubsidyInputFormType> label={"納税証明書"} name={"tax"} isEnabled={false} />
                                </li>
                            </ul>
                        </Container>
                        <Container title={"申請者情報"}>
                            <div>
                                <InputArea<SubsidyInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                            </div>
                            <div>
                                <InputArea<SubsidyInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                            </div>
                        </Container>
                        <TransitionArea>
                            <TransitionButton text='戻る' type={"prev"} currentUser={"approver"} onClick={back} />
                            <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={onSubmit} />
                        </TransitionArea>
                    </Container>
                </FormProvider>
            </main>

        </>
    )

};

export default SubsidyListDetailMain;