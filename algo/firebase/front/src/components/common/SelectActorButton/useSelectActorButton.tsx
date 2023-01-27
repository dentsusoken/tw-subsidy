const useSelectActorButton = (target: string) => {
    enum urls {
        "applier" = "/",
        "resident" = "/",
        "account" = "/",
        "tax" = "/",
        "subsidy" = "/"
    }

    enum colors {
        "applier" = "bg-applier-accent",
        "issuer" = "bg-issuer-accent",
        "subsidy" = "bg-subsidy-accent"
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