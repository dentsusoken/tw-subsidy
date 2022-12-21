import { useRouter } from 'next/router';

import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import ChangeUserButton from '@/components/common/ChangeUserButton';

const TaxListDoneMain = () => {
    const router = useRouter();

    const onSubmit = () => {
        router.push("/37_VCAccept")
    };

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <Container title={"処理完了"} >
                <div className={"text-center text-sm mb-24 mt-24"}>
                    <p>承認処理が完了しました。</p>
                </div>
                <ChangeUserButton text={"申請者の画面へ"} currentUser={"approver"} onClick={onSubmit}/>
            </Container>
        </>
    )
};

export default TaxListDoneMain;