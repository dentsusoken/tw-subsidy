import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import Container from '@/components/common/Container';
import ChangeUserButton from '@/components/common/ChangeUserButton';

const SubsidyDone: NextPage = () => {
    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            <Progress status={"done"} />
                <Container className='mt-16'>
                    <div className={"text-center text-sm mb-24"}>
                        <p>xxxxx申請が完了しました。</p>
                        <p>承認されるまでお待ちください。</p>
                    </div>
                    <ChangeUserButton  text={"承認者の画面へ"} currentUser={"applicant"} url={"/4.x/44_subsidyList"}/>
                </Container>
        </>
    )
};

export default SubsidyDone;