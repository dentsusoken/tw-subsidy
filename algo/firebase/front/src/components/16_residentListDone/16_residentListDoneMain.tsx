import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '@/components/Header';
import { residentVCListState } from '@/lib/states/mockApp';

const ResidentListDoneMain = () => {
  const router = useRouter();

  const listState = useRecoilValue(residentVCListState);

  const selectDetail = listState.find((v) => v.message.content.content.id === Number(router.query.id));

  const onSubmit = () => {
    router.push({
      pathname: '/17_vc-accept',
      query: { application: '住民票', message: '住民票紐付' },
    });
  };

  return (
    <>
      <Header menuType={2} menuTitle={'住民票紐付申請一覧'} />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>処理完了</h2>
        </div>
        <div className="py-0 px-[53px]">
          <p className="py-16 text-center text-[14px] leading-relaxed">
            {selectDetail ? selectDetail.message.content.content.fullName + ' ' : ' '}
            様の承認処理が完了しました。
          </p>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => {
                router.push({
                  pathname: '/14_resident-list',
                });
              }}
              className="input-form-button-white-done"
            >
              申請一覧へ戻る
            </button>
            <button onClick={onSubmit} className="input-form-button-green-done">
              申請者の画面へ
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResidentListDoneMain;
