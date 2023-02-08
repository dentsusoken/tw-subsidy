import { getAlgod } from "@/lib/algo/algod/algods";
import { revokeVerifiableCredential, verifyVerifiableCredential } from "@/lib/algosbt";
import chainState from "@/lib/states/chainState";
import { residentVCListState } from "@/lib/states/mockApp";
import { ResidentInputFormType, ResidentVCType } from "@/lib/types/mockApp";
import issuerDidAccountState from "@/lib/states/issuerDidAccountState";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ResidentInquiry } from "../common/Forms";
import Header from "../common/Header";
import Loading from "../common/Loading";
import { issuerPw } from "@/lib/algo/account/accounts";


const ResidentVCListDetailMain = () => {
  const router = useRouter();
  const ResidentVCListGlobal = useRecoilValue(residentVCListState);
  const [input, setInput] = useState<ResidentInputFormType>();
  const [vc, setVC] = useState<ResidentVCType>();
  const [revokeStatus, setRevokeStatus] = useState(true);
  const chain = useRecoilValue(chainState);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState(false);
  const issuerDidAccountGlobal = useRecoilValue(issuerDidAccountState);
  dayjs.locale('ja');

  useEffect(() => {
    (async () => {
      setIsLoading(() => true);
      const algod = getAlgod(chain);
      const id = router.query.id;
      const ResidentVC = ResidentVCListGlobal.find((v) => v.message.content.content.id === Number(id));
      if (ResidentVC) {
        const revoke = await verifyVerifiableCredential(algod, ResidentVC);
        setVC(ResidentVC);
        setInput(ResidentVC.message.content.content);
        setRevokeStatus(revoke);
      }

      setIsLoading(() => false);
    })();
  }, [ResidentVCListGlobal, router.query, chain])

  const revoke = async () => {
    setIsRevoking(() => true);
    const algod = getAlgod(chain);
    if (issuerDidAccountGlobal && vc) {
      await revokeVerifiableCredential(
        algod,
        issuerDidAccountGlobal,
        vc,
        issuerPw
      );
    }
    setIsRevoking(() => false);
    router.push("/83_residentVCListDone");
  }

  return (
    <>
      <Header />
      <main className="bg-color-background">
        {input && !isLoading &&
          <>
            <section className={`mb-4`}>
              <div className={"w-72 mx-auto p-4 border-b text-center"}>
                <p className={"text-base font-bold"}>{`住民票 VC${router.query.idx}`}</p>
                <p className={"text-xs leading-11 text-color-gray-search"}>{revokeStatus ? "発行済" : "取消済"}</p>
                <p className={"text-xs text-color-gray-search"}>申請日 {dayjs(input.applicationDate).format("YY/MM/DD HH:mm")}</p>
                <p className={"text-xs text-color-gray-search"}>発行日 {dayjs(input.issueDate).format("YY/MM/DD HH:mm")}</p>
              </div>
            </section>
            <ResidentInquiry input={input} />
            <div className={"relative w-80 mx-auto"}>
              {isRevoking
                ? <span className={"absolute right-0 -translate-y-1/2 text-sm leading-relaxed text-yellow-500"}>VC取消中...</span>
                : null
              }
            </div>
            <div className="py-0 px-[53px]">
              <div className="pt-4 pb-2 flex justify-between">
                <button
                  onClick={() => router.push("/81_residentVCList")}
                  className="input-form-button-white"
                >
                  戻る
                </button>
                {revokeStatus &&
                  <button
                    onClick={revoke}
                    className="input-form-button-red"
                  >
                    発行取消
                  </button>
                }
              </div>

            </div>
          </>}
        <Loading isLoading={isLoading} />
      </main>
    </>
  );
};

export default ResidentVCListDetailMain;