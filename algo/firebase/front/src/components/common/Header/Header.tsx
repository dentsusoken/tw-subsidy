import Link from "next/link";
import useHeader from "./useHeader";

const Header = () => {
    const { heading, color } = useHeader()

    return (
        <header className={"flex w-full h-16 py-5 px-5 " + color}>
            <h1 className={"text-white text-lg font-bold"}>{heading}</h1>
            <Link href="/00_menu">
                <a className={"ml-auto"} >
                    <img src="/home.svg" />
                </a>
            </Link>
        </header>
    )
}

export default Header;

