import Header from "../common/Header";
import Loading from "../common/Loading";
import TransitionButton from "../common/TransitionButton";
import AccountInquiry from "./AccountInquiry";
import ResidentInquiry from "./ResidentInquiry";
import SubsidyInquiry from "./SubsidyInquiry";
import TaxInquiry from "./TaxInquiry";
import useVCInquiryMain from "./useVCInquiryMain";


const ApplicationListDetailMain = () => {

    const { type, residentInput, accountInput, taxInput, subsidyInput, back, reqItem, isLoading } = useVCInquiryMain()
    return (
        <>
            <Header />
            {reqItem.applicationDate &&
                <main className={"mx-auto p-[10px] w-96"}>
                    <section>
                        <div className={"w-full h-11 px-4 bg-color-vcheader text-lg leading-11 font-bold"}>{"住民票紐付申請"}</div>
                        <div className={"w-72 mx-auto p-4 border-b text-center"}>
                            <p className={"text-base font-bold"}>{"住民票紐付申請"}</p>
                            <p className={`text-xs leading-11 ${reqItem.issuedStatus ? "text-color-gray-search" : "text-color-required"}`}>{reqItem.issuedStatus ? reqItem.revokeStatus ? "承認済み" : "取消済" : "承認待ち"}</p>
                            <p className={"text-xs text-color-gray-search"}>申請日 {reqItem.applicationDate}</p>
                        </div>
                    </section>
                    <section className={"py-4"}>
                        {type === "resident" && residentInput && <ResidentInquiry input={residentInput} />}
                        {type === "account" && accountInput && <AccountInquiry input={accountInput} />}
                        {type === "tax" && taxInput && <TaxInquiry input={taxInput} />}
                        {type === "subsidy" && subsidyInput && <SubsidyInquiry input={subsidyInput} />}
                    </section>
                    <section className={"mx-auto flex w-70"}>
                        <TransitionButton text='戻る' type={"prev"} currentUser={"applicant"} onClick={back} />
                    </section>
                </main>
            }
            <Loading isLoading={isLoading} />
        </>
    )
};

export default ApplicationListDetailMain;