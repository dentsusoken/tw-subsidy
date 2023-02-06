import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { residentVCListState } from '@/lib/states/mockApp';
import Container from '../common/Container';
import ChangeUserButton from '../common/ChangeUserButton';
import { urls } from '@/lib/types/mockApp';

const ResidentListDoneMain = () => {
  const router = useRouter();

  const listState = useRecoilValue(residentVCListState);

  const selectDetail = listState.find((v) => v.message.content.content.id === Number(router.query.id));

  const onSubmit = () => {
    router.push({
      pathname: '/17_vc-approve',
      query: { application: '住民票', message: '住民票紐付' },
    });
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Container>
          <p className="py-16 text-center text-[14px] leading-relaxed">
            {router.query.proc === "approve" ? "承認" : "却下"}処理が完了しました。
          </p>
          <div className={"flex flex-col justify-between gap-4"}>
            <ChangeUserButton text={"申請一覧へ"} currentUser={"applicant"} onClick={() => router.push(urls.residentList)} />
            <ChangeUserButton text={"自治体メニューへ"} currentUser={"applicant"} onClick={() => router.push(urls.residentMenu)} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default ResidentListDoneMain;
