import { useRouter } from 'next/router';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import ChangeUserButton from '../common/ChangeUserButton';


const TaxDoneMain = () => {
    const router = useRouter();

    return (
        <>
            <Header title='納税証明証交付申請' currentUser={"applicant"} />
            <main>
            <Progress status={"done"} />
                <Container className='mt-16'>
                    <div className={"text-center text-sm mb-24"}>
                        <p>xxxxx申請が完了しました。</p>
                        <p>承認されるまでお待ちください。</p>
                    </div>
                    <ChangeUserButton text={"承認者の画面へ"} currentUser={"applicant"} onClick={() => {router.push("/34_taxList")}}/>
                </Container>
            </main>

        </>
    )
};

export default TaxDoneMain;