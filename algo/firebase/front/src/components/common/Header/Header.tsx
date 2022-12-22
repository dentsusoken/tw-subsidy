export type HeaderParams = {
    title: string;
    currentUser: "applicant" | "approver";
}

const Header = ({ title, currentUser }: HeaderParams) => {
    return (
        <header className={"flex w-full h-16 py-5 px-5 " + ((currentUser == "applicant") ? "bg-color-green": "bg-color-blue" )}>
            <h1 className={"text-white text-lg font-bold"}>{title}</h1>
            <a className={"ml-auto"} href="/00_menu">
                <img src="/home.svg" />
            </a>
        </header>
    )
}

export default Header;

