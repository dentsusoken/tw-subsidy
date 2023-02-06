import { useRecoilState, useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
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
import SelectActorButton from '../../common/SelectActorButton';
import { useErrorHandler } from 'react-error-boundary';



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

  const errorHandler = useErrorHandler();

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
      issueDate: undefined,
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
      issueDate: undefined,
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
      issueDate: "",
      verifyStatus: false,
      approvalStatus: false,
    }))
    clearSubsidyInputState(() => ({
      id: 0,
      resident: "",
      account: "",
      tax: "",
      fullName: "",
      address: "",
      applicationDate: "",
      issueDate: "",
      verifyStatus: false,
      approvalStatus: false,
      residentVP: undefined,
      accountVP: undefined,
      taxVP: undefined
    }))
  };



  const onClear = () => {
    try {
      handleClearInputState();
      clearResidentVCListState(() => []);
      clearResidentVCRequestListState(() => []);
      clearAccountVCListState(() => []);
      clearAccountVCRequestListState(() => []);
      clearTaxVCListState(() => []);
      clearTaxVCRequestListState(() => []);
      clearSubsidyListState(() => []);
      clearVCListState(() => ({
        resident: [],
        account: [],
        tax: [],
        subsidy: []
      }));
      showClearSuccessMsg();
    } catch (e) {
      errorHandler(e);
    }
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
      <Header />
      <main className="bg-color-background">
        {haveDid
          ? null
          : <>
            <div className={"flex flex-col items-center"}>
              <p className='text-color-required text-sm text-center w-78'>リンクからDIDを作成してください。</p>
              <div className="w-56 mx-auto border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
                <a href="/simple-demo-accounts">DIDの作成</a>
              </div>
            </div>
          </>
        }
        <section className={"flex flex-col gap-6 w-fit mx-auto mt-11"}>
          <SelectActorButton target="applier" haveDid={haveDid} />
          <div className={"flex flex-col gap-3"}>
            <SelectActorButton target="resident" haveDid={haveDid} />
            <SelectActorButton target="account" haveDid={haveDid} />
            <SelectActorButton target="tax" haveDid={haveDid} />
          </div>
          <SelectActorButton target="subsidy" haveDid={haveDid} />
        </section>
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
