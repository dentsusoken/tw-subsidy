import { useRouter } from "next/router";
import { UrlObject } from "url";

export type VCListItemParams = {
    vc: string;
    accepted: boolean;
    url: UrlObject;
}

const VCListItem = ({ vc, accepted, url }: VCListItemParams) => {
    const router = useRouter()

    return (
        <>
            <li className={"flex w-full h-16 text-sm border-b border-color-gainsboro"}>
                <div className={"flex mx-auto items-center"}>
                    <span className={"w-40 text-base font-bold text-left"}>{vc}</span>
                    <span className={"w-15 mr-10 " + (accepted ? "text-color-gray-accepted" : "text-color-warnig")}>{accepted ? "受入済" : "未受入"}</span>
                    <button onClick={(() => { router.push(url) })} className={"w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                </div>
            </li>
        </>
    )
};

export default VCListItem; 