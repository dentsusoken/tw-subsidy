import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import useVCListContainer from './useVCListContainer';

export type VCListItems = {
    id: number;
    issueDate: string | undefined;
    acceptStatus: boolean;
}[]

export type VCListContainerTypes = {
    type: "住民票" | "口座実在証明書" | "納税証明書";
    items?: VCListItems;
}

const VCListContainer = ({ type, items }: VCListContainerTypes) => {
    const { onApply, onInquiry } = useVCListContainer();

    return (
        <section className={"mx-3 mt-4"}>
            <div className="flex w-full items-center bg-color-vcheader h-11">
                <h2 className={"pl-4 text-lg font-bold"}>{type}</h2>
            </div>
            <ul className={"h-[148px] overflow-y-scroll"}>
                {
                    items && items.length > 0 ?
                        items.map((item, index) => (
                            <li key={index} className={"flex items-center h-11 pl-3 pr-4 my-1 w-full border-b text-sm"}>
                                <span className={"w-7 text-color-gray"}>{index + 1}.</span>
                                <span className={"w-14 text-xs text-color-gray mr-3"}>{dayjs(item.issueDate).format("YY/MM/DD")}</span>
                                <span className={"w-35 ml-auto text-xs font-bold"}>{type} - VC{items.length - index}</span>
                                <span className={"w-10 ml-auto mr-2 text-xs " + (item.acceptStatus ? "text-color-gray" : "text-color-warnig")}>{item.acceptStatus ? "受入済" : "未受入"}</span>
                                <button className={"w-16 h-7 ml-auto border rounded-lg"} onClick={() => onInquiry(type, item.id, items.length - index)}>照会</button>
                            </li>
                        ))
                        :
                        <p className={"w-fit mt-3 mx-auto text-sm text-color-gray-search"}>取得済のVCはありません</p>
                }
            </ul>
        </section >
    )
};

export default VCListContainer;