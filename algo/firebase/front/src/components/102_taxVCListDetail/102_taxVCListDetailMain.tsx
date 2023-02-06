import chainState from "@/lib/states/chainState";
import { taxVCListState } from "@/lib/states/mockApp";
import { TaxInputFormType } from "@/lib/types/mockApp";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TaxInquiry } from "../common/Forms";
import Header from "../common/Header";


const TaxVCListDetailMain = () => {
  const router = useRouter();
  const TaxVCListGlobal = useRecoilValue(taxVCListState);
  const [input, setInput] = useState<TaxInputFormType>();

  useEffect(() => {
    const id = router.query.id;

    const TaxVC = TaxVCListGlobal.find((v) => v.message.content.content.id === Number(id));

    if (TaxVC) {
      setInput(TaxVC.message.content.content);
    }
  }, [TaxVCListGlobal, router.query])

  return (
    <>
      <Header />
      <main className="bg-color-background">
        {input &&
          <>
            <section className={`mb-4`}>
              <div className={"w-72 mx-auto p-4 border-b text-center"}>
                <p className={"text-base font-bold"}>{`納税証明書 VC${router.query.idx}`}</p>
                <p className={"text-xs leading-11 text-color-gray-search"}>受入済</p>
                <p className={"text-xs text-color-gray-search"}>申請日 {dayjs(input.applicationDate).format("YY/MM/DD HH:mm")}</p>
                <p className={"text-xs text-color-gray-search"}>発行日 {dayjs(input.issueDate).format("YY/MM/DD HH:mm")}</p>
              </div>
            </section>
            <TaxInquiry input={input} />
          </>}
        <div className="py-0 px-[53px]">
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => router.push("/101_taxVCList")}
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

export default TaxVCListDetailMain;
