import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { accountVCListState } from '@/lib/states/mockApp';
import Container from '../common/Container';
import ChangeUserButton from '../common/ChangeUserButton';
import { urls } from '@/lib/types/mockApp';

const AccountListDoneMain = () => {
  const router = useRouter();

  const listState = useRecoilValue(accountVCListState);

  const selectDetail = listState.find((v) => v.message.content.content.id === Number(router.query.id));

  const onSubmit = () => {
    router.push("/27_VCapprove");
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
            <ChangeUserButton text={"申請一覧へ"} currentUser={"applicant"} onClick={() => router.push(urls.accountList)} />
            <ChangeUserButton text={"銀行メニューへ"} currentUser={"applicant"} onClick={() => router.push(urls.accountMenu)} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default AccountListDoneMain;
