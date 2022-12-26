import { useRouter } from "next/router";

export type VCListItemParams = {
    vc: string;
    accepted: boolean;
    url: string;
}

const VCListItem = ({ vc, accepted, url }: VCListItemParams) => {
    const router = useRouter()

    return (
        <>
            <li className={"flex w-full h-16 text-sm border-b border-color-gainsboro"}>
                <div className={"flex mx-auto items-center"}>
                    <span className={"w-24 mr-10 text-base font-bold text-left"}>{vc}</span>
                    <span className={"w-15 mr-10 " + (accepted ? "text-color-grey-accepted" : "text-color-warnig")}>{accepted ? "受入済" : "未受入"}</span>
                    <button onClick={(() => { router.push(url) })} className={"w-18 h-7 leading-7 border border-color-grey rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                </div>
            </li>
        </>
    )
};

export default VCListItem; 