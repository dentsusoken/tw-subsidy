import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '@/components/Header';
import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { accountListState } from '@/lib/states/mockApp';

const AccountListDoneMain = () => {
  const router = useRouter();

  const listState: AccountInputFormType[] = useRecoilValue(accountListState);

  const selectDetail = listState.find((v) => v.id === Number(router.query.id));

  const onSubmit = () => {
    router.push({
      pathname: '/17_vc-accept',
      query: { application: '口座実在証明書', message: '口座実在証明書' },
    });
  };

  return (
    <>
      <Header menuType={2} menuTitle={'口座実在証明書申請一覧'} />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>処理完了</h2>
        </div>
        <div className="py-0 px-[53px]">
          <p className="py-16 text-center text-[14px] leading-relaxed">
            {selectDetail ? selectDetail.applicantName + ' ' : ' '}
            様の承認処理が完了しました。
          </p>
          <div className="pt-4 text-center">
            <button onClick={onSubmit} className="input-form-button-green">
              申請者の画面へ
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountListDoneMain;
