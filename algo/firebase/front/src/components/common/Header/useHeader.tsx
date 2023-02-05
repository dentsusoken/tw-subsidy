import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { urls, icons } from "@/lib/types/mockApp";

const useHeader = () => {
    const [heading, setHeading] = useState("");
    const [color, setColor] = useState("");
    const [isMainMenu, setIsMainMenu] = useState(false);
    const router = useRouter()

    const Headings = {
        mainMenu: "DEMO MENU",
        applierMenu: "申請者",
        residentMenu: "区役所",
        accountMenu: "銀行",
        taxMenu: "税務署",
        subsidyMenu: "申請先",
        accountAccept: "口座実在証明書の受入",
        taxApply: "納税証明書交付申請",
        taxApprove: "納税証明書交付申請一覧",
        taxAccept: "納税証明書の受入",
        subsidyApply: "補助金申請",
        subsidyApprove: "補助金申請一覧",
        VCList: "デジタル証明(VC)一覧",
        VCInquiry: "デジタル証明書(VC)内容照会"
    } as const;

    const colors = {
        mainMenu: "bg-color-gray",
        applier: "bg-color-applier-main",
        issuer: "bg-color-issuer-main",
        subsidy: "bg-color-subsidy-main",
    } as const;

    const getBgColor = () => {
        switch (router.pathname) {
            case urls.mainMenu:
                return colors.mainMenu;
            case urls.applierMenu:
            case urls.residentInput:
            case urls.residentConfirm:
            case urls.residentDone:
            case urls.accountInput:
            case urls.accountConfirm:
            case urls.accountDone:
            case urls.applierMenu:
            case urls.taxInput:
            case urls.taxConfirm:
            case urls.taxDone:
            case urls.subsidyInput:
            case urls.subsidyConfirm:
            case urls.subsidyDone:
            case urls.VCList:
            case urls.VCInquiry:
            case urls.applicationList:
            case urls.applicationListDetail:
                return colors.applier;
            case urls.residentMenu:
            case urls.residentList:
            case urls.residentListDetail:
            case urls.residentListDone:
            case urls.accountMenu:
            case urls.accountList:
            case urls.accountListDetail:
            case urls.accountListDone:
            case urls.taxMenu:
            case urls.taxList:
            case urls.taxListDetail:
            case urls.taxListDone:
                return colors.issuer;
            case urls.subsidyMenu:
            case urls.subsidyList:
            case urls.subsidyListDetail:
            case urls.subsidyListDone:
                return colors.subsidy;
            default:
                return "";
        }
    };

    const getHeading = () => {
        switch (router.pathname) {
            case urls.mainMenu:
                return Headings.mainMenu;
            case urls.applierMenu:
            case urls.residentInput:
            case urls.residentConfirm:
            case urls.residentDone:
            case urls.accountInput:
            case urls.accountConfirm:
            case urls.accountDone:
            case urls.taxInput:
            case urls.taxConfirm:
            case urls.taxDone:
            case urls.subsidyInput:
            case urls.subsidyConfirm:
            case urls.subsidyDone:
            case urls.VCList:
            case urls.VCInquiry:
            case urls.applicationList:
            case urls.applicationListDetail:
                return Headings.applierMenu;
            case urls.residentMenu:
            case urls.residentList:
            case urls.residentListDetail:
            case urls.residentListDone:
                return Headings.residentMenu;
            case urls.accountMenu:
            case urls.accountList:
            case urls.accountListDetail:
            case urls.accountListDone:
                return Headings.accountMenu;
            case urls.taxMenu:
            case urls.taxList:
            case urls.taxListDetail:
            case urls.taxListDone:
                return Headings.taxMenu;
            case urls.subsidyMenu:
            case urls.subsidyList:
            case urls.subsidyListDetail:
            case urls.subsidyListDone:
                return Headings.subsidyMenu;
            default:
                return "不正なURL";
        }
    }

    const getIcon = () => {
        switch (router.pathname) {
            case urls.applierMenu:
            case urls.residentInput:
            case urls.residentConfirm:
            case urls.residentDone:
            case urls.accountInput:
            case urls.accountConfirm:
            case urls.accountDone:
            case urls.taxInput:
            case urls.taxConfirm:
            case urls.taxDone:
            case urls.subsidyInput:
            case urls.subsidyConfirm:
            case urls.subsidyDone:
            case urls.VCList:
            case urls.VCInquiry:
            case urls.applicationList:
            case urls.applicationListDetail:
                return icons.applier;
            case urls.residentMenu:
            case urls.residentList:
            case urls.residentListDetail:
            case urls.residentListDone:
                return icons.resident;
            case urls.accountMenu:
            case urls.accountList:
            case urls.accountListDetail:
            case urls.accountListDone:
                return icons.account;
            case urls.taxMenu:
            case urls.taxList:
            case urls.taxListDetail:
            case urls.taxListDone:
                return icons.tax;
            case urls.subsidyMenu:
            case urls.subsidyList:
            case urls.subsidyListDetail:
            case urls.subsidyListDone:
                return icons.subsidy;
            default:
                return "";
        }
    }

    const getLink = (): { url: string, label: string } => {
        switch (router.pathname) {
            case urls.applierMenu:
            case urls.residentMenu:
            case urls.accountMenu:
            case urls.taxMenu:
            case urls.subsidyMenu:
                return { url: urls.mainMenu, label: "home" };
            case urls.residentInput:
            case urls.residentConfirm:
            case urls.residentDone:
            case urls.accountInput:
            case urls.accountConfirm:
            case urls.accountDone:
            case urls.taxInput:
            case urls.taxConfirm:
            case urls.taxDone:
            case urls.subsidyInput:
            case urls.subsidyConfirm:
            case urls.subsidyDone:
            case urls.VCList:
            case urls.VCInquiry:
            case urls.applicationList:
            case urls.applicationListDetail:
                return { url: urls.applierMenu, label: "menu" };
            case urls.residentList:
            case urls.residentListDetail:
            case urls.residentListDone:
                return { url: urls.residentMenu, label: "menu" };
            case urls.accountList:
            case urls.accountListDetail:
            case urls.accountListDone:
                return { url: urls.accountMenu, label: "menu" };
            case urls.taxList:
            case urls.taxListDetail:
            case urls.taxListDone:
                return { url: urls.taxMenu, label: "menu" };
            case urls.subsidyList:
            case urls.subsidyListDetail:
            case urls.subsidyListDone:
                return { url: urls.subsidyMenu, label: "menu" };
            default:
                return { url: "", label: "" };
        }
    }

    return { heading, color, getHeading, getBgColor, getIcon, getLink }
};

export default useHeader;