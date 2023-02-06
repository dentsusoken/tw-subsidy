import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import useSubsidyListDoneMain from './useSubsidyListDoneMain';
import ChangeUserButton from '../common/ChangeUserButton';
import { useRouter } from 'next/router';
import { urls } from '@/lib/types/mockApp';

const SubsidyListDoneMain = () => {
    const { title, msg, onSubmit, back } = useSubsidyListDoneMain();
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
                        <ChangeUserButton text={"申請一覧へ"} currentUser={"applicant"} onClick={() => router.push(urls.subsidyList)} />
                        <ChangeUserButton text={"申請先メニューへ"} currentUser={"applicant"} onClick={() => router.push(urls.subsidyMenu)} />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default SubsidyListDoneMain;