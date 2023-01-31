import Link from "next/link";
import useHeader from "./useHeader";

const Header = () => {
    const { getHeading, getBgColor, getIcon, getLink } = useHeader()

    const heading = getHeading();
    const bgColor = getBgColor();
    const icon = getIcon();
    const { url, label } = getLink();

    return (
        <header className={`flex w-full h-16 py-5 px-5 ${bgColor}`}>
            {icon && <img src={icon} alt="アイコン" className={"pr-2"} />}
            <h1 className={"text-white text-lg font-bold"}>{heading}</h1>
            {url && <Link href={url}>
                <a className={"w-[62px] h-[34px] bg-white ml-auto leading-[34px] text-center text-color-menu-button-text uppercase border border-color-menu-button rounded-lg"} >
                    {label}
                </a>
            </Link>}
        </header>
    )
}

export default Header;

