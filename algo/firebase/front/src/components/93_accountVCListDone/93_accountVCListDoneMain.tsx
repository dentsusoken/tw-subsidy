import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import ChangeUserButton from '../common/ChangeUserButton';
import { urls } from '@/lib/types/mockApp';
import { useRouter } from 'next/router';

const AccountVCListDoneMain = () => {
    const router = useRouter();

    return (
        <>
            <Header />
            <main className="bg-color-background">
                <Container>
                    <p className="py-16 text-center text-[14px] leading-relaxed">
                        VCの取消が完了しました。
                    </p>
                    <div className={"flex flex-col justify-between gap-4"}>
                        <ChangeUserButton text={"申請一覧へ"} currentUser={"applicant"} onClick={() => router.push(urls.accountVCList)} />
                        <ChangeUserButton text={"銀行メニューへ"} currentUser={"applicant"} onClick={() => router.push(urls.accountMenu)} />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default AccountVCListDoneMain;