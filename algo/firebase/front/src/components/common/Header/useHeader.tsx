import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useHeader = () => {
    const [heading, setHeading] = useState("");
    const [color, setColor] = useState("");
    const [isMainMenu, setIsMainMenu] = useState(false);
    const router = useRouter()

    enum Headings {
        mainMenu = "DEMO MENU",
        applierMenu = "申請者",
        accountAccept = "口座実在証明書の受入",
        taxApply = "納税証明書交付申請",
        taxApprove = "納税証明書交付申請一覧",
        taxAccept = "納税証明書の受入",
        subsidyApply = "補助金申請",
        subsidyApprove = "補助金申請一覧",
        VCList = "デジタル証明(VC)一覧"
    }

    enum colors {
        mainMenu = "bg-color-gray",
        applier = "bg-color-applier-main",
        issuer = "bg-color-issuer-main",
        subsidy = "bg-color-subsidy-main",
    }

    const getBgColor = () => {
        switch (router.pathname) {
            case "/00_menu":
                return "bg-color-gray";
            case "/011_applierMenu":
            case "/31_taxInput":
            case "/32_taxConfirm":
            case "/33_taxDone":
            case "/41_subsidyInput":
            case "/42_subsidyConfirm":
            case "/43_subsidyDone":
            case "/61_VCList":
                return colors.applier;
            case "/27_VCAccept":
                return "bg-color-green";
            case "/34_taxList":
            case "/35_taxListDetail":
            case "/36_taxListDone":
                return "bg-color-blue";
            case "/37_VCAccept":
                return "bg-color-green";
            case "/44_subsidyList":
            case "/45_subsidyListDetail":
            case "/46_subsidyListDone":
                return "bg-color-blue";
            case "/51_taxListAccepted":
            case "/52_taxListRevoked":
                return "bg-color-blue";
            default:
                return "";
        }
    };

    const getHeading = () => {
        switch (router.pathname) {
            case "/00_menu":
                return Headings.mainMenu;
            case "/011_applierMenu":
                return Headings.applierMenu;
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