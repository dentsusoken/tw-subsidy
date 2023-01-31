import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Header from '../common/Header';
import { residentVCListState, residentVCRequestListState, VCListState } from '@/lib/states/mockApp';
import { verifyVerifiableMessage, createVerifiableCredential } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { issuerPw } from '@/lib/algo/account/accounts';
import { useState } from 'react';

const ResidentListDetailMain = () => {
  const router = useRouter();

  const [listState, setListState] = useRecoilState(residentVCRequestListState);
  const setVCList = useSetRecoilState(residentVCListState);
  const setIssuedVCList = useSetRecoilState(VCListState);
  const [isIssuing, setIsIssuing] = useState(false)

  const selectDetail = listState.find((v) => v.message.content.id === Number(router.query.id));

  const [chainType] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);


  const onSubmit = async (status: boolean, pathname: string) => {
    if (selectDetail && holderDidAccountGlobal && issuerDidAccountGlobal) {
      setIsIssuing(true);
      const verified = verifyVerifiableMessage(selectDetail);

      if (verified) {
        const algod = getAlgod(chainType);
        dayjs.locale('ja');
        const now = dayjs();
        const content = selectDetail.message.content;
        const vcContent = {
          ...content,
          verifyStatus: status,
          approvalStatus: status,
          issueDate: dayjs(now).format('YYYY-MM-DD HH:mm:ss')
        };
        const vc = await createVerifiableCredential(
          algod,
          issuerDidAccountGlobal,
          holderDidAccountGlobal.did,
          vcContent,
          issuerPw
        );
        setListState((items) => items.filter((item) => item.message.content.id != content.id));
        setVCList((items) => [...items, vc]);
        setIssuedVCList((items) => ({ ...items, resident: [...items.resident, { VC: vc, acceptStatus: false }] }));
        setIsIssuing(false);
        router.push({ pathname, query: { id: router.query.id } });
      }
    }
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>申請内容照会</h2>
        </div>
        <div className="py-0 px-[53px]">
          <div className="input-form-label">氏名</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.fullName : ''}
          </div>
          <div className="input-form-label">氏名フリガナ</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.fullNameFurigana : ''}
          </div>
          <div className="input-form-label">住所</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.address : ''}
          </div>
          <div className="input-form-label">住民となった年月</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.addressRegistDate : ''}
          </div>
          <div className="input-form-label">本籍地</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.permanentAddress : ''}
          </div>
          <div className={"h-7 relative"}>
            {isIssuing
              ? <span className={"absolute right-0 bottom-0 text-sm leading-relaxed text-yellow-500"}>VC発行中...</span>
              : null
            }
          </div>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => onSubmit(false, '/14_resident-list')}
              className="input-form-button-white"
            >
              却下
            </button>
            <button
              onClick={() => onSubmit(true, '/16_resident-list-done')}
              className="input-form-button-blue"
            >
              承認
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResidentListDetailMain;
