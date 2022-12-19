import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import Header from '@/components/Header';
import { accountListState } from '@/lib/states/mockApp';

const AccountListDetailMain = () => {
  const router = useRouter();

  const [listState, setListState] = useRecoilState(accountListState);

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
      pathname: '/26_account-list-done',
      query: { id: router.query.id },
    });
  };

  return (
    <>
      <Header menuType={2} menuTitle={'口座実在証明書申請一覧'} />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>申請内容照会</h2>
        </div>
        <div className="py-0 px-[53px]">
          <div className="input-form-label">銀行コード</div>
          <div className="input-form-text-box-confirm-half">
            {selectDetail ? selectDetail.bankCode : ''}
          </div>
          <div className="input-form-label">支店番号</div>
          <div className="input-form-text-box-confirm-half">
            {selectDetail ? selectDetail.branchNumber : ''}
          </div>
          <div className="input-form-label">口座番号</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.accountNumber : ''}
          </div>
          <div className="input-form-label">法人名称</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.corporateName : ''}
          </div>
          <div className="input-form-label">申請者名</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.applicantName : ''}
          </div>
          <div className="input-form-label">申請住所</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.applicantAddress : ''}
          </div>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => {
                router.push({
                  pathname: '/24_account-list',
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

export default AccountListDetailMain;
