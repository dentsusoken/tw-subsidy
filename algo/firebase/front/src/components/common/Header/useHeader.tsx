import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useHeader = () => {
    const [heading, setHeading] = useState("");
    const [color, setColor] = useState("");
    const [isMainMenu, setIsMainMenu] = useState(false);
    const router = useRouter()

    enum Headings {
        mainMenu = "DEMO MENU",
        accountAccept = "口座実在証明書の受入",
        taxApply = "納税証明書交付申請",
        taxApprove = "納税証明書交付申請一覧",
        taxAccept = "納税証明書の受入",
        subsidyApply = "補助金申請",
        subsidyApprove = "補助金申請一覧",
        VCList = "デジタル証明(VC)一覧"
    }

    const getBgColor = () => {
        switch (router.pathname) {
            case "/00_menu":
                return "bg-color-gray";
            case "/27_VCAccept":
                return "bg-color-green";
                break;
            case "/31_taxInput":
            case "/32_taxConfirm":
            case "/33_taxDone":
                return "bg-color-green";
                break;
            case "/34_taxList":
            case "/35_taxListDetail":
            case "/36_taxListDone":
                return "bg-color-blue";
                break;
            case "/37_VCAccept":
                return "bg-color-green";
                break;
            case "/41_subsidyInput":
            case "/42_subsidyConfirm":
            case "/43_subsidyDone":
                return "bg-color-green";
                break;
            case "/44_subsidyList":
            case "/45_subsidyListDetail":
            case "/46_subsidyListDone":
                return "bg-color-blue";
                break;
            case "/51_taxListAccepted":
            case "/52_taxListRevoked":
                return "bg-color-blue";
                break;
            case "/61_VCList":
                return "bg-color-green";
                break;
            default:
                "";
        }
    };

    const getHeading = () => {
        switch (router.pathname) {
            case "/00_menu":
                return Headings.mainMenu;
            case "/27_VCAccept":
                return Headings.taxAccept;
            case "/31_taxInput":
            case "/32_taxConfirm":
            case "/33_taxDone":
                return Headings.taxApply;
            case "/34_taxList":
            case "/35_taxListDetail":
            case "/36_taxListDone":
                return Headings.taxApprove;
            case "/37_VCAccept":
                return Headings.taxAccept;
            case "/41_subsidyInput":
            case "/42_subsidyConfirm":
            case "/43_subsidyDone":
                return Headings.subsidyApply;
            case "/44_subsidyList":
            case "/45_subsidyListDetail":
            case "/46_subsidyListDone":
                return Headings.subsidyApprove;
            case "/51_taxListAccepted":
            case "/52_taxListRevoked":
                switch (router.query.vc) {
                    case "resident":
                    case "account":
                    case "tax":
                        return Headings.taxApprove;
                    case "subsidy":
                        return Headings.subsidyApply;
                    default:
                }
                break;
            case "/61_VCList":
                return Headings.VCList;
            default:
                return "不正なURL";
        }
    }

    return { heading, color, getHeading, getBgColor }
};

export default useHeader;