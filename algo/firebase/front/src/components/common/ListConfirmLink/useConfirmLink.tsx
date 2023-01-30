const useConfirmLink = (actor: string, type: string) => {
    enum applierUrls {
        application = "/00_menu",
        VC = "/61_VCList",
    }
    enum residentUrls {
        application = "/14_resident-list",
        VC = "/81_VCList",
    }
    enum accountUrls {
        application = "/24_account-list",
        VC = "/91_VCList",
    }
    enum taxUrls {
        application = "/34_taxList",
        VC = "/101_VCList",
    }
    enum subsidyUrls {
        application = "/44_subsidyList",
        VC = "/61_VCList",  //不要？
    }

    enum colors {
        applier = "bg-color-applier-shadow",
        issuer = "bg-color-issuer-shadow",
        subsidy = "bg-color-subsidy-shadow",
    }

    const getUrl = () => {
        switch (actor) {
            case "applier":
                switch (type) {
                    case "application":
                        return applierUrls.application;
                    case "VC":
                        return applierUrls.VC;
                    default:
                        return "";
                }
                case "resident":
                switch (type) {
                    case "application":
                        return residentUrls.application;
                    case "VC":
                        return residentUrls.VC;
                    default:
                        return "";
                }
                case "account":
                switch (type) {
                    case "application":
                        return accountUrls.application;
                    case "VC":
                        return accountUrls.VC;
                    default:
                        return "";
                }
                case "tax":
                switch (type) {
                    case "application":
                        return taxUrls.application;
                    case "VC":
                        return taxUrls.VC;
                    default:
                        return "";
                }
                case "subsidy":
                switch (type) {
                    case "application":
                        return subsidyUrls.application;
                    case "VC":
                        return subsidyUrls.VC;
                    default:
                        return "";
                }
            default:
                return "";
        }
    }

    const getColor = () => {
        switch (actor) {
            case "applier":
                return colors.applier;
            case "resident":
            case "account":
            case "tax":
                return colors.issuer;
            case "subsidy":
                return colors.subsidy;
            default:
                return "";
        }
    }

    return { getUrl, getColor }
};

export default useConfirmLink;