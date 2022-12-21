import { useRouter } from 'next/router';
import { useRecoilState, SetterOrUpdater, RecoilState, useSetRecoilState } from 'recoil';


import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { useEffect, useState } from 'react';

export type ListParams = {
    taxInfo?: TaxInputFormType;
    subsidyInfo?: SubsidyInputFormType;
    url: string
    setTaxInput?: SetterOrUpdater<TaxInputFormType>;
    setSubsidyInput?: SetterOrUpdater<SubsidyInputFormType>;
};



const ApplicationList = ({ taxInfo, subsidyInfo, url, setTaxInput, setSubsidyInput }: ListParams) => {
    // const sett = useSetRecoilState(state);
    const [info, setInfo] = useState<TaxInputFormType | SubsidyInputFormType>()

    useEffect(() => {
        !!taxInfo && setInfo(taxInfo);
        !!subsidyInfo && setInfo(subsidyInfo);
    })

    const router = useRouter();
    const inquire = () => {
        !!setTaxInput && !!taxInfo && setTaxInput(taxInfo)
        !!setSubsidyInput && !!subsidyInfo && setSubsidyInput(subsidyInfo)
        router.push(url)
    }


    return (
        <>
            {!!info ? (
                <li className={"flex items-center w-full h-16 px-3 text-sm border-b border-li"}>

                    <div className={"flex items-center mx-auto"}>
                        <span className={"pr-2"}>{info.applicationDate}</span>
                        <span className={"w-18"}>{info.fullName}</span>
                        <div className={"w-12 h-12"}>
                            {info.verifyStatus ? (<img src="/authenticated.svg" alt="" className="inline-block" />) : ""}
                        </div>
                        <span className={"text-center text-warnig w-18"}>{info.approvalStatus ? "" : "未承認"}</span>
                        <button onClick={inquire} className={"w-18 h-7 leading-7 border border-past rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                    </div>

                </li>
            ) : null}
        </>
    )
};

export default ApplicationList;