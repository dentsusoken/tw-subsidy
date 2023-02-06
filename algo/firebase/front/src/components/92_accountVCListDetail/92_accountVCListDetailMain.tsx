import chainState from "@/lib/states/chainState";
import holderDidAccountState from "@/lib/states/holderDidAccountState";
import issuerDidAccountState from "@/lib/states/issuerDidAccountState";
import { accountVCListState } from "@/lib/states/mockApp";
import { AccountInputFormType } from "@/lib/types/mockApp";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AccountInquiry } from "../common/Forms";
import Header from "../common/Header";


const AccountVCListDetailMain = () => {
  const router = useRouter();
  const AccountVCListGlobal = useRecoilValue(accountVCListState);
  const [input, setInput] = useState<AccountInputFormType>();

  useEffect(() => {
    const id = router.query.id;

    const AccountVC = AccountVCListGlobal.find((v) => v.message.content.content.id === Number(id));

    if (AccountVC) {
      setInput(AccountVC.message.content.content);
    }
  }, [AccountVCListGlobal, router.query])

  const [chainType] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  return (
    <>
      <Header />
      <main className="bg-color-background">
        {input &&
          <>
            <section className={`mb-4`}>
              <div className={"w-72 mx-auto p-4 border-b text-center"}>
                <p className={"text-base font-bold"}>{`口座実在証明書 VC${router.query.idx}`}</p>
                <p className={"text-xs leading-11 text-color-gray-search"}>受入済</p>
                <p className={"text-xs text-color-gray-search"}>申請日 {dayjs(input.applicationDate).format("YY/MM/DD HH:mm")}</p>
                <p className={"text-xs text-color-gray-search"}>発行日 {dayjs(input.issueDate).format("YY/MM/DD HH:mm")}</p>
              </div>
            </section>
            <AccountInquiry input={input} />
          </>}
        <div className="py-0 px-[53px]">
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => router.push("/91_accountVCList")}
              className="input-form-button-white"
            >
              戻る
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountVCListDetailMain;
