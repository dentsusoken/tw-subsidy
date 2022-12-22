import { useRouter } from 'next/router';

import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import { useEffect, useState } from 'react';

const TaxListDoneMain = () => {
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.query.proc === "approve") {
            setTitle("処理完了")
            setMsg("承認処理が完了しました。")
        }
        else if (router.query.proc === "delete") {
            setTitle("承認取消完了")
            setMsg("承認を取り消しました。")
        }
    })


    const onSubmit = () => {
        router.push("/37_VCAccept")
    };

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <Container title={title} >
                <div className={"text-center text-sm mb-24 mt-24"}>
                    <p>{msg}</p>
                </div>
                <TransitionArea>
                    <TransitionButton text='申請一覧へ戻る' type={"prev"} currentUser={"approver"} onClick={back} />
                    <TransitionButton text='申請者の画面へ' type={"next"} currentUser={"applicant"} onClick={onSubmit} />
                </TransitionArea>
            </Container>
        </>
    )
};

export default TaxListDoneMain;