import Link from "next/link";
import useHeader from "./useHeader";

const Header = () => {
    const { heading, color, getHeading, getBgColor } = useHeader()

    return (
        <header className={`flex w-full h-16 py-5 px-5 ${getBgColor()}`}>
            <h1 className={"text-white text-lg font-bold"}>{getHeading()}</h1>
            <Link href="/00_menu">
                <a className={"ml-auto"} >
                    <img src="/home.svg" />
                </a>
            </Link>
        </header>
    )
}

export default Header;

