const useStepLink = (step: number) => {
    enum labels {
        step1 = "住民票紐付申請",
        step2 = "口座実在証明申請",
        step3 = "納税証明書交付申請",
        step4 = "補助金申請",
    }

    enum urls {
        step1 = "/11_resident-input",
        step2 = "/21_account-input",
        step3 = "/31_taxInput",
        step4 = "/41_subsidyInput",
    }

    const getLabel = () => {
        switch (step) {
            case 1:
                return labels.step1
            case 2:
                return labels.step2
            case 3:
                return labels.step3
            case 4:
                return labels.step4
            default:
                return ""
        }
    }
    const getUrl = () => {
        switch (step) {
            case 1:
                return urls.step1
            case 2:
                return urls.step2
            case 3:
                return urls.step3
            case 4:
                return urls.step4
            default:
                return ""
        }
    }

    return { getLabel, getUrl }
};

export default useStepLink;