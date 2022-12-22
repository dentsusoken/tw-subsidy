import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';


import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';

export type ListParams<T> = {
    subsidyInfo: SubsidyInputFormType;
};



const ApplicationList = ({ subsidyInfo }: ListParams<T>) => {
    const router = useRouter();
    const [input, setInput] = useRecoilState(subsidyInputState);
    
    const inquire = () => {
        setInput(subsidyInfo);
        router.push("/45_subsidyListDetail")
    }


    return (
        <li className={"flex items-center w-full h-16 px-3 text-sm border-b border-color-gainsboro"}>
            <div className={"flex items-center mx-auto"}>
                <span className={"pr-2"}>{subsidyInfo.applicationDate}</span>
                <span className={"w-18"}>{subsidyInfo.fullName}</span>
                <div className={"w-12 h-12"}>
                    {subsidyInfo.verifyStatus ? (<img src="/authenticated.svg" alt="" className="inline-block" />) : ""}
                </div>
                <span className={"text-center text-color-warnig w-18"}>{subsidyInfo.approvalStatus ? "" : "未承認"}</span>
                <button onClick={inquire} className={"w-18 h-7 leading-7 border border-color-grey rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
            </div>
        </li>
    )
};

export default ApplicationList;