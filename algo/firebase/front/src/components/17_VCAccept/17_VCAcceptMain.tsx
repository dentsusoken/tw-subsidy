import { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Header';

const VCAcceptMain = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const buttonClickHandler = async () => {
    setDisabled(!disabled);

    await delay(2000);

    let pathname = '';

    switch (router.query.application) {
      case '住民票':
      default:
        pathname = '/14_resident-list';
        break;
      case '口座実在証明書':
        pathname = '/24_account-list';
        break;
    }

    router.push({ pathname });
  };

  return (
    <>
      <Header menuType={1} menuTitle={router.query.application + 'の受入'} />
      <main className="bg-color-background">
        <div className="py-0 px-[53px]">
          <p className="py-16 text-center text-[14px] leading-relaxed">
            あなたが申請した、
            <br />
            {router.query.message}申請が最終承認されました。
            <br />
            <br />
            デジタル証明書を受け入れますか？
          </p>
          <div className="pt-4 flex justify-between">
            <button
              onClick={buttonClickHandler}
              disabled={disabled}
              className={
                disabled ? 'input-form-button-gray' : 'input-form-button-white'
              }
            >
              却下
            </button>
            <button
              onClick={buttonClickHandler}
              disabled={disabled}
              className={
                disabled ? 'input-form-button-gray' : 'input-form-button-green'
              }
            >
              受入
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default VCAcceptMain;
