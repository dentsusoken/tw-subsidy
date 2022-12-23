import { useRouter } from 'next/router';
import { SetterOrUpdater } from 'recoil';
import { useEffect, useState } from 'react';

import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { TaxInputFormType } from '@/lib/types/mockApp/Form';

export type useApplicationiListParams = {
    taxInfo?: TaxInputFormType;
    subsidyInfo?: SubsidyInputFormType;
    setTaxInput?: SetterOrUpdater<TaxInputFormType>;
    setSubsidyInput?: SetterOrUpdater<SubsidyInputFormType>;
};


const useApplicationiList = ({ taxInfo, subsidyInfo, setTaxInput, setSubsidyInput }: useApplicationiListParams) => {
    const [info, setInfo] = useState<TaxInputFormType | SubsidyInputFormType>()
    const [approveUrl, setApproveUrl] = useState("");
    const [revokeUrl, setRevokeUrl] = useState("");
    const router = useRouter();

    useEffect(() => {
        getInfo();
        getUrl();
    });

    const urls = {
        taxApprove: "/35_taxListDetail",
        taxRevoke: "/51_taxListAccepted",
        subsidyApprove: "/45_subsidyListDetail",
        subsidyRevoke: "/51_taxListAccepted",
    };

    const getInfo = () => {
        !!taxInfo && setInfo(taxInfo);
        !!subsidyInfo && setInfo(subsidyInfo);
    };

    const getUrl = () => {
        !!taxInfo && setApproveUrl(urls.taxApprove);
        !!taxInfo && setRevokeUrl(urls.taxRevoke);
        !!subsidyInfo && setApproveUrl(urls.subsidyApprove);
        !!subsidyInfo && setRevokeUrl(urls.subsidyRevoke);
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
        router.push(revokeUrl);
    };

    return { info, approve, revoke };
};

export default useApplicationiList;