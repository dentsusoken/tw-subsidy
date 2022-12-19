import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import Header from '@/components/Header';
import { residentListState } from '@/lib/states/mockApp';

const ResidentListDetailMain = () => {
  const router = useRouter();

  const [listState, setListState] = useRecoilState(residentListState);

  const selectDetail = listState.find((v) => v.id === Number(router.query.id));

  const onSubmit = () => {
    // 検証・承認ステータスをONにする
    if (selectDetail) {
      const replaceData = {
        ...selectDetail,
        verifyStatus: true,
        approvalStatus: true,
      };

      const updateData = [...listState];

      for (let i = 0; i < listState.length; i++) {
        if (listState[i].id === selectDetail.id) {
          updateData.splice(i, 1, replaceData);
          break;
        }
      }

      setListState(updateData);
    }

    router.push({
      pathname: '/16_resident-list-done',
      query: { id: router.query.id },
    });
  };

  return (
    <>
      <Header menuType={2} menuTitle={'住民票紐付申請一覧'} />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>申請内容照会</h2>
        </div>
        <div className="py-0 px-[53px]">
          <div className="input-form-label">氏名</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.fullName : ''}
          </div>
          <div className="input-form-label">氏名フリガナ</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.fullNameFurigana : ''}
          </div>
          <div className="input-form-label">住所</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.address : ''}
          </div>
          <div className="input-form-label">住民となった年月</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.addressRegistDate : ''}
          </div>
          <div className="input-form-label">本籍地</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.permanentAddress : ''}
          </div>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => {
                router.push({
                  pathname: '/14_resident-list',
                });
              }}
              className="input-form-button-white"
            >
              却下
            </button>
            <button onClick={onSubmit} className="input-form-button-blue">
              承認
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResidentListDetailMain;
