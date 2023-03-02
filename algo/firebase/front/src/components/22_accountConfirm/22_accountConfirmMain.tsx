import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Header from '../common/Header';
import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { accountInputState, accountVCRequestListState } from '@/lib/states/mockApp';

import { createVerifiableMessage } from '@/lib/algosbt';
import { holderPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import Progress from '../common/Progress';
import { useErrorHandler } from 'react-error-boundary';

const AccountConfirmMain = () => {
  const router = useRouter();
  const errorHandler = useErrorHandler();

  const [input, setInput] = useRecoilState(accountInputState);
  const setList = useSetRecoilState(accountVCRequestListState);

  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  const onSubmit = () => {
    try {
      dayjs.locale('ja');
      const id = dayjs().unix();
      const now = dayjs();
      const applicationDate = dayjs(now).format('YYYY-MM-DD HH:mm:ss');

      const accountInputDate: AccountInputFormType = {
        id,
        bankCode: input.bankCode,
        branchNumber: input.branchNumber,
        accountNumber: input.accountNumber,
        corporateName: input.corporateName,
        applicantName: input.applicantName,
        applicantAddress: input.applicantAddress,
        applicationDate,
        verifyStatus: false,
        approvalStatus: false,
      };

      setInput(() => ({ ...accountInputDate }));

      if (!!holderDidAccountGlobal && !!issuerDidAccountGlobal) {
        setList((items) => [...items, createVerifiableMessage(
          holderDidAccountGlobal,
          issuerDidAccountGlobal.did,
          accountInputDate,
          holderPw
        )]);
      }

      router.push('/23_account-done');
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Progress status='confirm' />
        <div className="mt-[9px] py-0 px-[53px]">
          <div className="input-form-label">金融機関コード</div>
          <input
            type="text"
            disabled={true}
            value={input.bankCode}
            className="input-form-text-box-confirm-half"
          />
          <div className="input-form-label">支店番号</div>
          <input
            type="text"
            disabled={true}
            value={input.branchNumber}
            className="input-form-text-box-confirm-half"
          />
          <div className="input-form-label">口座番号</div>
          <input
            type="text"
            disabled={true}
            value={input.accountNumber}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">法人名称</div>
          <input
            type="text"
            disabled={true}
            value={input.corporateName}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">申請者名</div>
          <input
            type="text"
            disabled={true}
            value={input.applicantName}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">申請住所</div>
          <input
            type="text"
            disabled={true}
            value={input.applicantAddress}
            className="input-form-text-box-confirm"
          />
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => router.back()}
              className="input-form-button-gray"
            >
              戻る
            </button>
            <button onClick={onSubmit} className="input-form-button-green">
              申請
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountConfirmMain;
