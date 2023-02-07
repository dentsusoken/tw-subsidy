import { useRouter } from 'next/router';

import Header from '../common/Header';
import Container from '../common/Container';
import ChangeUserButton from '../common/ChangeUserButton';
import { urls } from '@/lib/types/mockApp';

const ResidentListDoneMain = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Container>
          <p className="py-16 text-center text-[14px] leading-relaxed">
            {router.query.proc === "approve" ? "承認" : "却下"}処理が完了しました。
          </p>
          <div className={"flex flex-col justify-between gap-4"}>
            <ChangeUserButton text={"申請一覧へ"} onClick={() => router.push(urls.residentList)} />
            <ChangeUserButton text={"自治体メニューへ"} onClick={() => router.push(urls.residentMenu)} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default ResidentListDoneMain;
