const useListConfirmLink = (actor: string, type: string) => {
    enum applierUrls {
        application = "/00_menu",
        VC = "/61_VCList",
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
            default:
                return "";
        }
    }

    return {getUrl}
};

export default useListConfirmLink;