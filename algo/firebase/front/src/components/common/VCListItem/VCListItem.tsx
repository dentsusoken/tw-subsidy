import dayjs from "dayjs";
import { useRouter } from "next/router";
import { UrlObject } from "url";

export type VCInfo = {
    id: number;
    name: string;
    issueDate: string | undefined;
    revoked: boolean;
}

export type VCListItemParams = {
    item: VCInfo;
    url: string | UrlObject;
}

const VCListItem = ({ item, url }: VCListItemParams) => {
    const router = useRouter();

    return (
        <>
            <li className={"flex w-full h-16 text-sm border-b border-color-gainsboro"}>
                <div className={"flex justify-between mx-auto gap-4 items-center"}>
                    <span className={"w-fit"}>{dayjs(item.issueDate).format("MM月DD日(ddd)")}</span>
                    <span className={"w-24"}>{item.name}</span>
                    <span className={"w-fit text-color-gray-accepted"}>{item.revoked ? "発行済" : "取消済"}</span>
                    <button onClick={(() => { router.push(url) })} className={"w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                </div>
            </li>
        </>
    )
};

export default VCListItem; 