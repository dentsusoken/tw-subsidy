import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import ChangeUserButton from '@/components/common/ChangeUserButton';
import { useRouter } from 'next/router';

const SubsidyListDone: NextPage = () => {
    const router = useRouter()

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <Container title={"処理完了"} >
                <div className={"text-center text-sm mb-24 mt-24"}>
                    <p>{(router.query.type == "accept") ? "承認" : "却下"}処理が完了しました。</p>
                </div>
                <ChangeUserButton url={"/4.x/41_subsidyInput"} text={"申請者の画面へ"} currentUser={"approver"} />
            </Container>
        </>
    )
};

export default SubsidyListDone;