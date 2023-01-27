import Link from "next/link"
import useSelectActorButton from "./useSelectActorButton";

export type SelectActorButtonParams = {
    label: string;
    icon: string;
    target: "applier" | "resident" | "account" | "tax" | "subsidy"
}

const SelectActorButton = ({ label, icon, target }: SelectActorButtonParams) => {
    const { getUrl, getBgColor } = useSelectActorButton(target);
    return (
        <>
            <Link href={getUrl()}>
                <a className={`block relative w-[234px] h-[81px] rounded-lg ${getBgColor()}`}>
                    <img src={icon} alt="アイコン" className={"absolute top-1/2 left-[30px] -translate-y-1/2"} />
                    <span className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max pl-[30px] text-[15px] font-bold text-color-white"}>{label}</span>
                </a>
            </Link>
        </>
    )
};

export default SelectActorButton;