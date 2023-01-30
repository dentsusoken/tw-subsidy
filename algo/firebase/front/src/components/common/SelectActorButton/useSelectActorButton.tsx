const useSelectActorButton = (target: string) => {
    enum urls {
        "applier" = "/011_applierMenu",
        "resident" = "/012_residentMenu",
        "account" = "/013_accountMenu",
        "tax" = "/014_taxMenu",
        "subsidy" = "/015_subsidyMenu"
    }

    enum colors {
        "applier" = "bg-color-applier-main",
        "issuer" = "bg-color-issuer-main",
        "subsidy" = "bg-color-subsidy-main"
    }

    const getUrl = () => {
        switch (target) {
            case "applier":
                return urls.applier
            case "resident":
                return urls.resident
            case "account":
                return urls.account
            case "tax":
                return urls.tax
            case "subsidy":
                return urls.subsidy
            default:
                return ""
        }
    }

    const getBgColor = () => {
        switch (target) {
            case "applier":
                return colors.applier
            case "resident":
            case "account":
            case "tax":
                return colors.issuer
            case "subsidy":
                return colors.subsidy
            default:
                return ""
        }
    }


    return { getUrl, getBgColor }
};

export default useSelectActorButton;