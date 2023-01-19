import { ReactNode } from "react"

export type ContainerParams = {
    children: ReactNode;
    title?: string;
    className?: string;
    isRequred?: boolean;
};

const Container = ({ children, title, className, isRequred }: ContainerParams) => {
    return (
        <section className={"mx-auto w-80 my-7 " + (className ? className : "")}>
            {title
                ?
                <> <h2 className={"font-bold text-base"}>{title}{isRequred ? <span className="input-form-label-required font-normal">（必須）</span> : null}</h2>
                    {/* <div className={"text-center"}> */}
                    {children}
                    {/* </div> */}
                </>
                :
                <>{children}</>
            }
        </section>
    )
};

export default Container;