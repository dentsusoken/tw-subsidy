import { ReactNode } from "react"

export type ContainerParams = {
    children: ReactNode;
    title?: string;
    className?: string;
};

const Container = ({ children, title, className }: ContainerParams) => {
    return (
        <section className={"mx-auto w-80 my-7 " + (className? className : "")}>
            {title
                ?
                <> <h2 className={"font-bold text-base"}>{title}</h2>
                    <div className={"ml-3 mt-7"}>
                        {children}
                    </div>
                </>
                :
                <>{children}</>
            }
        </section>
    )
};

export default Container;