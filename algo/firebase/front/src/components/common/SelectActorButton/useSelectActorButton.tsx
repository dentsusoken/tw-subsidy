import { urls, icons } from "@/lib/types/mockApp";

const useSelectActorButton = (target: string) => {

    const colors = {
        applier: "bg-color-applier-main",
        issuer: "bg-color-issuer-main",
        subsidy: "bg-color-subsidy-main"
    } as const;

    const msg = {
        applierMenu: "申請者メニュー",
        residentMenu: "区役所メニュー",
        accountMenu: "銀行メニュー",
        taxMenu: "税務署メニュー",
        subsidyMenu: "申請先メニュー",
    } as const;

    const getUrl = () => {
        switch (target) {
            case "applier":
                return urls.applierMenu;
            case "resident":
                return urls.residentMenu;
            case "account":
                return urls.accountMenu;
            case "tax":
                return urls.taxMenu;
            case "subsidy":
                return urls.subsidyMenu;
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

    const getIcons = () => {
        switch (target) {
            case "applier":
                return icons.applier;
            case "resident":
                return icons.resident;
            case "account":
                return icons.account;
            case "tax":
                return icons.tax;
            case "subsidy":
                return icons.subsidy;
            default:
                return ""
        }
    }

    const getLabel = () => {
        switch (target) {
            case "applier":
                return msg.applierMenu;
            case "resident":
                return msg.residentMenu;
            case "account":
                return msg.accountMenu;
            case "tax":
                return msg.taxMenu;
            case "subsidy":
                return msg.subsidyMenu;
            default:
                return ""
        }
    }


    return { getUrl, getBgColor, getIcons, getLabel }
};

export default useSelectActorButton;