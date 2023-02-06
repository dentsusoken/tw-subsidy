import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import useTaxListDoneMain from './useTaxListDoneMain';
import ChangeUserButton from '../common/ChangeUserButton';
import { urls } from '@/lib/types/mockApp';
import { useRouter } from 'next/router';

const TaxListDoneMain = () => {
    const { msg, onSubmit, back } = useTaxListDoneMain();
    const router = useRouter();

    return (
        <>
            <Header />
            <main className="bg-color-background">
                <Container>
                    <p className="py-16 text-center text-[14px] leading-relaxed">
                        {msg}
                    </p>
                    <div className={"flex flex-col justify-between gap-4"}>
                        <ChangeUserButton text={"申請一覧へ"} currentUser={"applicant"} onClick={() => router.push(urls.taxList)} />
                        <ChangeUserButton text={"税務署メニューへ"} currentUser={"applicant"} onClick={() => router.push(urls.taxMenu)} />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default TaxListDoneMain;