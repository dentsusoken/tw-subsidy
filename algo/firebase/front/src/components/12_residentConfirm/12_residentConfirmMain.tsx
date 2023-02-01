import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentInputState, residentVCRequestListState } from '@/lib/states/mockApp';

import { createVerifiableMessage } from '@/lib/algosbt';
import { holderPw } from '@/lib/algo/account/accounts';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import Progress from '../common/Progress';

const ResidentConfirmMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(residentInputState);
  const setList = useSetRecoilState(residentVCRequestListState);

  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  const onSubmit = () => {
    dayjs.locale('ja');
    const id = dayjs().unix();
    const now = dayjs();
    // const applicationDate = dayjs(now).format('M月D日(ddd)');
    const applicationDate = dayjs(now).format('YYYY-MM-DD HH:mm:ss');

    const residentInputDate: ResidentInputFormType = {
      id,
      fullName: input.fullName,
      fullNameFurigana: input.fullNameFurigana,
      address: input.address,
      addressRegistDate: input.addressRegistDate,
      addressRegistYear: input.addressRegistYear,
      addressRegistMonth: input.addressRegistMonth,
      permanentAddress: input.permanentAddress,
      applicationDate,
      verifyStatus: false,
      approvalStatus: false,
    };

    setInput(() => ({ ...residentInputDate }));
    if (!!holderDidAccountGlobal && !!issuerDidAccountGlobal) {
      setList((items) => [...items, createVerifiableMessage(
        holderDidAccountGlobal,
        issuerDidAccountGlobal.did,
        residentInputDate,
        holderPw
      )]);
    }

    router.push('/13_resident-done');
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Progress status='confirm'/>
        <div className="mt-[9px] py-0 px-[53px]">
          <div className="input-form-label">氏名</div>
          <input
            type="text"
            disabled={true}
            value={input.fullName}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">氏名フリガナ</div>
          <input
            type="text"
            disabled={true}
            value={input.fullNameFurigana}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">住所</div>
          <input
            type="text"
            disabled={true}
            value={input.address}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">住民となった年月</div>
          <input
            type="text"
            disabled={true}
            value={input.addressRegistDate}
            className="input-form-text-box-confirm"
          />
          <div className="input-form-label">本籍地</div>
          <input
            type="text"
            disabled={true}
            value={input.permanentAddress}
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

export default ResidentConfirmMain;
