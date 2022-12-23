import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useHeader = () => {
    const [heading, setHeading] = useState("")
    const [color, setColor] = useState("")
    const router = useRouter()

    useEffect(() => {
        init();
    });

    const Headings = {
        taxApply: "納税証明書交付申請",
        taxApprove: "納税証明書交付申請一覧",
        taxAccept: "納税証明書の受入",
        subsidyApply: "補助金申請",
        subsidyApprove: "補助金申請一覧"
    }

    const init = () => {
        switch (router.pathname) {
            case "/31_taxInput":
            case "/32_taxConfirm":
            case "/33_taxDone":
                setHeading(Headings.taxApply);
                setColor("bg-color-green");
                break;
            case "/34_taxList":
            case "/35_taxListDetail":
            case "/36_taxListDone":
                setHeading(Headings.taxApprove);
                setColor("bg-color-blue");
                break;
            case "/37_VCAccept":
                setHeading(Headings.taxAccept);
                setColor("bg-color-green");
                break;
            case "/41_subsidyInput":
            case "/42_subsidyConfirm":
            case "/43_subsidyDone":
                setHeading(Headings.subsidyApply);
                setColor("bg-color-green");
                break;
            case "/44_subsidyList":
            case "/45_subsidyListDetail":
            case "/46_subsidyListDone":
                setHeading(Headings.subsidyApprove);
                setColor("bg-color-blue");
                break;
            default:
                setHeading("不正なURL");
        }
    };

    return { heading, color }
};

export default useHeader;