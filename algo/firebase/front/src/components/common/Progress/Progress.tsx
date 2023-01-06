export type ProgressParams = {
    status: "input" | "confirm" | "done";
}

const Progress = ({ status }: ProgressParams) => {
    return (
        <section className={"w-72 h-20 mx-auto pt-6 pb-7"}>

            <div className={"flex justify-start px-1"}>
                <span className={"text-xs block " + ((status == "input") ? "text-color-green" : (status == "confirm") ? "text-color-grey" : "text-color-grey")}>入力</span>
                <span className={"text-xs block ml-auto " + ((status == "input") ? "text-color-light-grey" : (status == "confirm") ? "text-color-green" : "text-color-grey")}>確認</span>
                <span className={"text-xs block ml-auto " + ((status == "input") ? "text-color-light-grey" : (status == "confirm") ? "text-color-light-grey" : "text-color-green")}>完了</span>
            </div>
            <div className={"flex justify-center items-center"}>
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-color-green" : (status == "confirm") ? "bg-color-grey" : "bg-color-grey")}></div>
                <hr className={"block w-28 border-dotted"} />
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-white border border-color-light-grey" : (status == "confirm") ? "bg-color-green" : "bg-color-grey")}></div>
                <hr className={"block w-28 border-dotted"} />
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-white border border-color-light-grey" : (status == "confirm") ? "bg-white border border-color-light-grey" : "bg-color-green")}></div>
            </div>
        </section>
    )
};

export default Progress;