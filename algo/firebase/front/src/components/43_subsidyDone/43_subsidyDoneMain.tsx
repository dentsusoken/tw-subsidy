import { useRouter } from 'next/router';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import ChangeUserButton from '../common/ChangeUserButton';


const SubsidyDoneMain = () => {
    const router = useRouter();

    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            <main>
            <Progress status={"done"} />
                <Container className='mt-16'>
                    <div className={"text-center text-sm mb-24"}>
                        <p>xxxxx申請が完了しました。</p>
                        <p>承認されるまでお待ちください。</p>
                    </div>
                    <ChangeUserButton text={"承認者の画面へ"} currentUser={"applicant"} onClick={() => {router.push("/44_subsidyList")}}/>
                </Container>
            </main>

        </>
    )
};

export default SubsidyDoneMain;