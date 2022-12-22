import { useForm, FormProvider } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

const TaxListDetailMain = () => {
    const input = useRecoilValue(taxInputState);
    const [listState, setListState] = useRecoilState(taxInputListState);
    const reset = useResetRecoilState(taxInputState);
    const router = useRouter();

    const methods = useForm<TaxInputFormType>({
        defaultValues: {
            applicationYear: input.applicationYear,
            corporationName: input.corporationName,
            corporationAddress: input.corporationAddress,
            fullName: input.fullName,
            address: input.address,
            verifyStatus: false,
            approvalStatus: false,
            applicationDate: ""
        },
    });

    const onSubmit = () => {

        const replaceData: TaxInputFormType = {
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

        // router.push('/36_taxListDone', '/36_taxListDone');
        router.push({
            pathname: '/36_taxListDone',
            query: { proc: "approve" }
        }, '/36_taxListDone')
    };

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }

    const revoke = () => {
        const replaceData: TaxInputFormType = {
            ...input,
            approvalStatus: false,
            verifyStatus: false
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
            pathname: "/52_taxListRevoked",
            query: { proc: "delete" }
        }, "/52_taxListRevoked");
    }

    return (
        <>
            <Header title='納税証明書交付申請一覧' currentUser={"approver"} />
            <main>
                <FormProvider {...methods} >
                    <Container title='申請内容照会'>
                        {(router.pathname == '/35_taxListDetail')
                            ? null
                            :
                            <div className={"text-center"}>
                                <span className={"text-sm text-past"}>2022年12月20日 承認済</span>
                            </div>
                        }
                        <Container>
                            <InputArea<TaxInputFormType> label={"申請年度"} name={"applicationYear"} validation={{ min: 4, max: 4, pattern: /[0-9]{4}/, required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label={"法人名称"} name={"corporationName"} validation={{ required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label={"所在地"} name={"corporationAddress"} validation={{ required: true }} isEnabled={false} />
                            <InputArea<TaxInputFormType> label='申請者名' name='fullName' placeholder='' isEnabled={false} />
                            <InputArea<TaxInputFormType> label='申請者住所' name="address" placeholder='' isEnabled={false} />
                        </Container>
                        <TransitionArea>
                            {(router.pathname == '/35_taxListDetail')
                                ? (
                                    <>
                                        <TransitionButton text='却下' type={"prev"} currentUser={"approver"} onClick={back} />
                                        <TransitionButton text='承認' type={"next"} currentUser={"approver"} onClick={onSubmit} />
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