import { useRouter } from 'next/router';

import Header from '../common/Header';
import Progress from '../common/Progress';

const ResidentDoneMain = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Progress status='done'/>
        <div className="mt-[9px] py-0 px-[53px]">
          <p className="py-16 text-center text-[14px] leading-relaxed">
            住民票紐付申請が完了しました。
            <br />
            承認されるまでお待ちください。
          </p>
          <div className="pt-4 text-center">
            <button
              onClick={() => {
                router.push({
                  pathname: '/14_resident-list',
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

export default ResidentDoneMain;
