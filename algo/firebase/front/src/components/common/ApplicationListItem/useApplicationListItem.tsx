import { useRouter } from 'next/router';
import { SetterOrUpdater } from 'recoil';
import { useEffect, useState } from 'react';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { UrlObject } from 'url';

export type useApplicationListItemParams = {
    taxInfo?: TaxInputFormType;
    subsidyInfo?: SubsidyInputFormType;
    setTaxInput?: SetterOrUpdater<TaxInputFormType>;
    setSubsidyInput?: SetterOrUpdater<SubsidyInputFormType>;
};


const useApplicationListItem = ({ taxInfo, subsidyInfo, setTaxInput, setSubsidyInput }: useApplicationListItemParams) => {
    const [info, setInfo] = useState<TaxInputFormType | SubsidyInputFormType>()
    const [approveUrl, setApproveUrl] = useState("");
    const [revokeUrl, setRevokeUrl] = useState("");
    const [query, setQuery] = useState({});
    const router = useRouter();
    const urls = {
        taxApprove: "/35_taxListDetail",
        taxRevoke: "/51_taxListAccepted",
        subsidyApprove: "/45_subsidyListDetail",
        subsidyRevoke: "/51_taxListAccepted",
    };

    useEffect(() => {
        getInfo();
        getUrl();
    }, [taxInfo, subsidyInfo]);



    const getInfo = () => {
        !!taxInfo && setInfo(taxInfo);
        !!subsidyInfo && setInfo(subsidyInfo);
    };

    const getUrl = () => {
        !!taxInfo && setApproveUrl(urls.taxApprove);
        !!taxInfo && setRevokeUrl(urls.taxRevoke);
        !!taxInfo && setQuery({ vc: "tax" });
        !!subsidyInfo && setApproveUrl(urls.subsidyApprove);
        !!subsidyInfo && setRevokeUrl(urls.subsidyRevoke);
        !!subsidyInfo && setQuery({ vc: "subsidy" });
    };

    const setGlobalState = () => {
        !!setTaxInput && !!taxInfo && setTaxInput(taxInfo);
        !!setSubsidyInput && !!subsidyInfo && setSubsidyInput(subsidyInfo);
    }

    const approve = () => {
        setGlobalState();
        router.push(approveUrl);
    };

    const revoke = () => {
        setGlobalState();
        router.push({
            pathname: revokeUrl,
            query: query
        });
    };

    return { info, approve, revoke };
};

export default useApplicationListItem;