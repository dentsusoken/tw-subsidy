import Header from "../common/Header";
import TransitionButton from "../common/TransitionButton";
import AccountInquiry from "./AccountInquiry";
import ResidentInquiry from "./ResidentInquiry";
import TaxInquiry from "./TaxInquiry";
import useVCInquiryMain from "./useVCInquiryMain";


const VCInquiryMain = () => {

    const { type, idx, applicationDate, issueDate, acceptDate, isEnabled, residentInput, accountInput, taxInput, back, accept } = useVCInquiryMain()
    return (
        <>
            <Header />
            <main className={"mx-auto p-[10px] w-96"}>
                <section>
                    <div className={"w-full h-11 px-4 bg-color-vcheader text-lg leading-11 font-bold"}>{type}</div>
                    <div className={"w-72 mx-auto p-4 border-b text-center"}>
                        <p className={"text-base font-bold"}>{type} - VC{idx}</p>
                        <p className={"text-xs leading-11 text-color-gray-search"}>受入済</p>
                        <p className={"text-xs text-color-gray-search"}>申請日 {applicationDate}</p>
                        <p className={"text-xs text-color-gray-search"}>発行日 {issueDate}</p>
                        {acceptDate !== "" && <p className={"text-xs text-color-gray-search"}>受入日 {acceptDate}</p>}
                    </div>
                </section>
                <section className={"py-4"}>
                    {type === "住民票" && residentInput && <ResidentInquiry input={residentInput} />}
                    {type === "口座実在証明書" && accountInput && <AccountInquiry input={accountInput} />}
                    {type === "納税証明書" && taxInput && <TaxInquiry input={taxInput} />}
                </section>
                <section className={"mx-auto flex w-70"}>
                    <TransitionButton text='戻る' type={"prev"} currentUser={"applicant"} onClick={back} />
                </section>
            </main>
        </>
    )
};

export default VCInquiryMain;