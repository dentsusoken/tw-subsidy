import { applicationInfoType } from "@/lib/types/4.x";
import BaseButton from "../BaseButton";

export type ListParams = {
    applicationInfo: applicationInfoType;
};

const ApplicationList = ({ applicationInfo }: ListParams) => {
    const day = ["日", "月", "火", "水", "木", "金", "土"]
    return (
        <li className={"flex items-center w-full h-16 px-3 text-sm border-b border-li"}>
            <div className={"flex items-center mx-auto"}>
                <span className={"pr-2"}>{applicationInfo.date.getMonth() + 1}月{applicationInfo.date.getDate()}日({day[applicationInfo.date.getDay()]})</span>
                {/* <span className={"pr-4"}>10月13日(木)</span> */}
                <span className={"w-18"}>{applicationInfo.name}</span>
                <div className={"w-12 h-12"}>
                    {applicationInfo.authenticated ? (<img src="/authenticated.svg" alt="" className="inline-block" />) : ""}
                </div>
                <span className={"text-center text-warnig w-18"}>{applicationInfo.authenticated ? "" : "未承認"}</span>
                <BaseButton url={"/4.x/45_subsidyListDetail"} className={"w-18 h-7 leading-7 border border-past rounded-lg block ml-auto text-base text-center font-bold"}>照会</BaseButton>
                {/* <a className={"w-18 h-7 leading-7 border border-past rounded-lg block ml-auto text-base text-center font-bold"}>照会</a> */}
            </div>

        </li>
    )
};

export default ApplicationList;