import Link from "next/link";
import { ReactNode, MouseEventHandler } from "react";

export type BaseButtonParams = {
    url: string;
    children: ReactNode;
    className?: string;
    query?: string;
}

const BaseButton = ({ url, children, className, query = "" }:BaseButtonParams) => {
    return (
        <Link href={{ pathname: url, query: query}} as={url}>
            <a className={"block text-center " + className} >{children}</a>
        </Link>
    )
};

export default BaseButton;