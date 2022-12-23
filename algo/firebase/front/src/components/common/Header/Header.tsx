import useHeader from "./useHeader";

const Header = () => {
    const { heading, color } = useHeader()

    return (
        <header className={"flex w-full h-16 py-5 px-5 " + color}>
            <h1 className={"text-white text-lg font-bold"}>{heading}</h1>
            <a className={"ml-auto"} href="/00_menu">
                <img src="/home.svg" />
            </a>
        </header>
    )
}

export default Header;

