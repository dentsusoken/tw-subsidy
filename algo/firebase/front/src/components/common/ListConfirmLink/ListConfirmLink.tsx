import Link from "next/link";
import useListConfirmLink from "./useListConfirmLink";

export type ListConfirmLinkParam = {
    actor: "applier" | "issuer" | "subsidy";
    type: "application" | "VC"
}

const ListConfirmLink = ({ actor, type }: ListConfirmLinkParam) => {
    const { getUrl } = useListConfirmLink(actor, type)
    return (
        <Link href={getUrl()}>
            <a className="flex flex-col justify-center items-center gap-[6px] bg-color-applier-shadow w-[139px] h-[89px] rounded-lg">
                <img src={
                    type === "application"
                        ? "/application-icon.svg"
                        : "/VC-icon.svg"
                } alt="アイコン"
                    className={(type === "application" ? "pl-[6px]" : "")}
                />

                {
                    type === "application"
                        ? <span className="mt-[6px] text-center text-[15px] leading-[15px] font-bold">申請一覧</span>
                        : <span className="text-center text-[12px] font-bold">デジタル証明書<br />(VC)一覧</span>
                }
            </a>
        </Link>
    )
};

export default ListConfirmLink;