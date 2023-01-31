import { useRouter } from "next/router";
import { urls } from "@/lib/types/mockApp";

const usePageTitle = () => {
    const router = useRouter()

    const title = {
        applierMenu : "申請者メニュー",
        residentMenu : "区役所メニュー",
        accountMenu : "銀行メニュー",
        taxMenu : "税務署メニュー",
        subsidyMenu : "申請先メニュー",
    } as const;

    const getTitle = () => {
        switch (router.pathname) {
            case urls.applierMenu:
                return title.applierMenu;
            case urls.residentMenu:
                return title.residentMenu;
            case urls.accountMenu:
                return title.accountMenu;
            case urls.taxMenu:
                return title.taxMenu;
            case urls.subsidyMenu:
                return title.subsidyMenu;
        }
    }

    return { getTitle }
};

export default usePageTitle;