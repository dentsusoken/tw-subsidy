import { accountInputState, residentInputState, taxInputState } from "@/lib/states/mockApp";
import { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';

const useVCListContainer = () => {
    const router = useRouter()
    const clearResidentInputState = useSetRecoilState(residentInputState);
    const clearAccountInputState = useSetRecoilState(accountInputState);
    const clearTaxInputState = useSetRecoilState(taxInputState);

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
            issueDate: "",
            verifyStatus: false,
            approvalStatus: false,
        }))
    };

    const onApply = (type: string) => {
        handleClearInputState();
        
        switch (type) {
            case "住民票":
                router.push("/11_resident-input")
            case "口座実在証明書":
                router.push("/21_account-input")
            case "納税証明書":
                router.push("/31_taxInput")
        }
    }

    const onInquiry = (type: string, id: number, idx: number) => {
        router.push({
            pathname: "/62_VCInquiry",
            query: {
                "type": type,
                "id": id,
                "idx": idx
            }
        })
    }
    return { onApply, onInquiry }
};

export default useVCListContainer;