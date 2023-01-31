import { useRouter } from 'next/router';

import Header from '../common/Header';

const AccountDoneMain = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <div className="step">
          <ul className="step-list">
            <li>入力</li>
            <li>確認</li>
            <li className="active">完了</li>
          </ul>
        </div>
        <div className="py-0 px-[53px]">
          <p className="py-16 text-center text-[14px] leading-relaxed">
            口座実在証明書申請が完了しました。
            <br />
            承認されるまでお待ちください。
          </p>
          <div className="pt-4 text-center">
            <button
              onClick={() => {
                router.push({
                  pathname: '/24_account-list',
                });
              }}
              className="input-form-button-blue"
            >
              承認者の画面へ
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountDoneMain;
