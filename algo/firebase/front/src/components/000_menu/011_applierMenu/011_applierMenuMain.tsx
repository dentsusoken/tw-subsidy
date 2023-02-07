import Container from "../../common/Container";
import Header from "../../common/Header";
import ConfirmLink from "../../common/ListConfirmLink";
import StepLink from "../../common/StepLink";
import Arrow from "../../common/Arrow";
import { useSetRecoilState } from "recoil";
import { accountInputState, residentInputState, subsidyInputState, taxInputState } from "@/lib/states/mockApp";

const ApplierMenuMain = () => {
    const clearResidentInputState = useSetRecoilState(residentInputState);
    const clearAccountInputState = useSetRecoilState(accountInputState);
    const clearTaxInputState = useSetRecoilState(taxInputState);
    const clearSubsidyInputState = useSetRecoilState(subsidyInputState);

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

    return (
        <>
            <Header />
            <main>
                <Container>
                    <div className="flex gap-[19px] w-fit mx-auto mt-16">
                        <ConfirmLink actor="applier" type="application" />
                        <ConfirmLink actor="applier" type="VC" />
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col justify-center items-center w-[294px] h-[416px] mx-auto bg-color-line-shadow">
                        <StepLink step={1} onClick={handleClearInputState} />
                        <Arrow />
                        <StepLink step={2} onClick={handleClearInputState} />
                        <Arrow />
                        <StepLink step={3} onClick={handleClearInputState} />
                        <Arrow />
                        <StepLink step={4} onClick={handleClearInputState} />
                    </div>
                </Container>
            </main>
        </>
    )
};

export default ApplierMenuMain;