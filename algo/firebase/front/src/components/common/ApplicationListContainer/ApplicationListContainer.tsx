import { residentListState, taxInputState, taxInputListState, taxVCListState, taxVCRequestListState, residentInputState, residentVCRequestListState, accountInputState } from '@/lib/states/mockApp';
import { useRecoilValue, useSetRecoilState } from "recoil";
import ApplicationListItem from "../ApplicationListItem";
import { AccountInputFormType, ResidentInputFormType } from "@/lib/types/mockApp/inputForm";
import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useApplicationListContainer from './useApplicationListContainer';
import dayjs from 'dayjs';


export type RequestItem = {
    id: number;
    applicationDate: string | undefined;
    issuedStatus: boolean;
    revokeStatus: boolean;
}

export type ApplicationListContainerParams = {
    type: "resident" | "account" | "tax" | "subsidy";
    items?: RequestItem[];
}


const ApplicationListContainer = ({ type, items }: ApplicationListContainerParams) => {
    const { getMsg, onInquiry } = useApplicationListContainer(type);


    const msg = getMsg();

    return (
        <section>
            <div className={`h-[37px] pl-[14px] pt-[10px] bg-color-gray-count`}>
                <h3 className={`font-bold`}>{msg}一覧<span className={`pl-[10px] text-color-gray-search font-normal`}>{items && items.length}件</span></h3>
            </div>
            <div>
                <ul className={"max-h-[148px] overflow-y-scroll"}>
                    {
                        items && items.length > 0 ?
                            items.map((item, index) => (
                                <li key={index} className={"flex items-center h-11 pl-3 pr-4 my-1 w-full border-b text-sm last:border-b-0"}>
                                    <span className={"w-14 text-xs mr-3"}>{dayjs(item.applicationDate).format("YY/MM/DD")}</span>
                                    <span className={"w-32"}>{msg}</span>
                                    <span className={"ml-auto mr-2 text-xs " + (item.issuedStatus ? "text-color-gray" : "text-color-warnig")}>{item.issuedStatus ? item.revokeStatus ? "承認済み" : "取消済" : "承認待ち"}</span>
                                    <button className={"w-16 h-7 ml-auto border rounded-lg"} onClick={() => onInquiry(type, item.id)}>照会</button>
                                </li>
                            ))
                            :
                            <p className={"w-fit mt-3 mx-auto text-sm text-color-gray-search"}>申請中のVCはありません</p>
                    }
                </ul>
            </div>
        </section>
    )
};

export default ApplicationListContainer;