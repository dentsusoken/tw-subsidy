import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Header from '@/components/Header';
import {
  residentInputState,
  residentVCListState,
  residentVCRequestListState,
  accountInputState,
  accountVCListState,
  accountVCRequestListState,
  taxInputState,
  taxVCListState,
  taxVCRequestListState,
  subsidyInputState,
  subsidyListState,
  VCListState
} from '@/lib/states/mockApp';

import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import verifierDidAccountState from '@/lib/states/verifierDidAccountState';
import { useEffect, useState } from 'react';



const MenuMain = () => {
  const clearResidentInputState = useSetRecoilState(residentInputState);
  const clearResidentVCListState = useSetRecoilState(residentVCListState);
  const clearResidentVCRequestListState = useSetRecoilState(residentVCRequestListState);
  const clearAccountInputState = useSetRecoilState(accountInputState);
  const clearAccountVCListState = useSetRecoilState(accountVCListState);
  const clearAccountVCRequestListState = useSetRecoilState(accountVCRequestListState);
  const clearTaxInputState = useSetRecoilState(taxInputState);
  const clearTaxVCListState = useSetRecoilState(taxVCListState);
  const clearTaxVCRequestListState = useSetRecoilState(taxVCRequestListState);
  const clearSubsidyInputState = useSetRecoilState(subsidyInputState);
  const clearSubsidyListState = useSetRecoilState(subsidyListState);
  const clearVCListState = useSetRecoilState(VCListState);

  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);
  const [verifierDidAccountGlobal] = useRecoilState(verifierDidAccountState);

  const [haveDid, setHaveDid] = useState(true)
  const [clearMsg, setclearMsg] = useState("")

  useEffect(() => {
    if (holderDidAccountGlobal && issuerDidAccountGlobal && verifierDidAccountGlobal) {
      setHaveDid(true);
    }
    else {
      setHaveDid(false);
    }
  })

  const handleClearInputState = () => {
    clearResidentInputState(() => ({
      id: 0,
      fullName: '',
      fullNameFurigana: '',
      address: '',
      addressRegistDate: '',
      addressRegistYear: '',
      addressRegistMonth: '',
      permanentAddress: '',
      applicationDate: undefined,
      verifyStatus: undefined,
      approvalStatus: undefined
    }))
    clearAccountInputState(() => ({
      id: 0,
      bankCode: '',
      branchNumber: '',
      accountNumber: '',
      corporateName: '',
      applicantName: '',
      applicantAddress: '',
      applicationDate: undefined,
      verifyStatus: undefined,
      approvalStatus: undefined,
    }))
    clearTaxInputState(() => ({
      id: 0,
      applicationYear: "",
      corporationName: "",
      corporationAddress: "",
      fullName: "",
      address: "",
      applicationDate: "",
      verifyStatus: false,
      approvalStatus: false,
    }))
    clearSubsidyInputState(() => ({
      id: 0,
      resident: false,
      account: false,
      tax: false,
      fullName: "",
      address: "",
      applicationDate: "",
      verifyStatus: false,
      approvalStatus: false,
      residentVP: undefined,
      accountVP: undefined,
      taxVP: undefined
    }))
  };



  const onClear = () => {
    handleClearInputState();
    clearResidentVCListState(() => []);
    clearResidentVCRequestListState(() => []);
    clearAccountVCListState(() => []);
    clearAccountVCRequestListState(() => []);
    clearTaxVCListState(() => []);
    clearTaxVCRequestListState(() => []);
    clearSubsidyListState(() => []);
    clearVCListState(() => ({}));
    showClearSuccessMsg();
  };

  const showClearSuccessMsg = async () => {
    setclearMsg("データクリアが完了しました。")
    await delay(5000);
    setclearMsg("")
  }

  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      <Header menuType={0} menuTitle={'DEMO MENU'} />
      <main className="bg-color-background">
        <div className={"relative"}>
          <div className='absolute -translate-y-14 left-1/2 transform -translate-x-1/2'>
            {haveDid
              ? null
              : <>
                <p className='text-color-required text-sm text-center w-78'>リンクからDIDを作成してください。</p>
                <div className="w-56 mx-auto border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
                  <a href="/simple-demo-accounts">DIDの作成</a>
                </div>
              </>
            }
          </div>

        </div>
        <ul className="py-0 px-[53px]">
          <ul className="w-[228px] mt-[70px] mx-auto mb-0">
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP1</span>
              <Link href="/11_resident-input">
                <a onClick={handleClearInputState} className={"menu-button " + (haveDid ? "" : "pointer-events-none bg-color-gray-search opacity-30")}>
                  住民票紐付申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP2</span>
              <Link href="/21_account-input">
                <a onClick={handleClearInputState} className={"menu-button " + (haveDid ? "" : "pointer-events-none bg-color-gray-search opacity-30")}>
                  口座実在証明申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP3</span>
              <Link href="/31_taxInput">
                <a onClick={handleClearInputState} className={"menu-button " + (haveDid ? "" : "pointer-events-none bg-color-gray-search opacity-30")}>
                  納税証明書交付申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP4</span>
              <Link href="/41_subsidyInput">
                <a onClick={handleClearInputState} className={"menu-button " + (haveDid ? "" : "pointer-events-none bg-color-gray-search opacity-30")}>
                  補助金申請
                </a>
              </Link>
            </li>
          </ul>
        </ul>
        <div className="pt-32 pl-4 pb-4 flex justify-between">
          <button onClick={onClear} className={"input-form-button-small " + (haveDid ? "" : "bg-color-gray-search opacity-30")} disabled={!haveDid}>
            データクリア
          </button>
        </div>
        <div className={"relative pl-4"}>
          <p className='absolute -translate-y-24 text-color-required text-sm w-78 pt-4'>{clearMsg}</p>
        </div>
      </main>
    </>
  );
};

export default MenuMain;
