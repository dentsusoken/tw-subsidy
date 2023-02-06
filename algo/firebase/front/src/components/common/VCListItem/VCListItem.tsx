import dayjs from "dayjs";
import { useRouter } from "next/router";
import { UrlObject } from "url";

export type VCListItemParams = {
    name: string;
    revoked: boolean;
    url: string | UrlObject;
}

const VCListItem = ({ name, revoked, url }: VCListItemParams) => {
    const router = useRouter();

    return (
        <>
            <li className={"flex w-full h-16 text-sm border-b border-color-gainsboro"}>
                <div className={"flex justify-between mx-auto gap-4 items-center"}>
                    <span className={"w-fit"}>{dayjs().format("MM月DD日(ddd)")}</span>
                    <span className={"w-24"}>{name}</span>
                    <span className={"w-fit " + (revoked ? "text-color-gray-accepted" : "text-color-warnig")}>{revoked ? "発行済" : "取消済"}</span>
                    <button onClick={(() => { router.push(url) })} className={"w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                </div>
            </li>
        </>
    )
};

export default VCListItem; 