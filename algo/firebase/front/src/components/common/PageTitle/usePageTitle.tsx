import { useRouter } from "next/router";

const usePageTitle = () => {
    const router = useRouter()

    enum title {
        applierMenu = "申請者メニュー"
    }

    const getTitle = () => {
        switch (router.pathname) {
            case "/011_applierMenu":
                return title.applierMenu
        }
    }

    return { getTitle }
};

export default usePageTitle;