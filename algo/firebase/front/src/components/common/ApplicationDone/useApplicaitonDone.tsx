import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useApplicationDone = () => {
    const router = useRouter();
    const [msg, SetMsg] = useState("");
    const [url, SetUrl] = useState("");
    const msgs = {
        address: "住民票紐付申請",
        account: "口座実在証明申請",
        tax: "納税証明書交付申請",
        subsidy: "補助金申請"
    };

    useEffect(() => {
        init();
    });

    const init = () => {
        switch (router.pathname) {
            case "/33_taxDone":
                SetUrl("/34_taxList");
                SetMsg(msgs.tax);
                break;
            case "/43_subsidyDone":
                SetUrl("/44_subsidyList");
                SetMsg(msgs.subsidy);
                break;
            default:
                SetUrl("")
                SetMsg("");
        }
    }

    const changeUser = () => {
        router.push({
            pathname: url
        }, url);
    };

    return { msg, changeUser }
};

export default useApplicationDone;