export type ProgressParams = {
    status: "input" | "confirm" | "done";
}

const Progress = ({ status }: ProgressParams) => {
    return (
        <section className={"w-72 h-20 mx-auto pt-6 pb-7"}>

            <div className={"flex justify-start px-1"}>
                <span className={"text-xs block " + ((status == "input") ? "text-applicant" : (status == "confirm") ? "text-past" : "text-past")}>入力</span>
                <span className={"text-xs block ml-auto " + ((status == "input") ? "text-will" : (status == "confirm") ? "text-applicant" : "text-past")}>確認</span>
                <span className={"text-xs block ml-auto " + ((status == "input") ? "text-will" : (status == "confirm") ? "text-will" : "text-applicant")}>完了</span>
            </div>
            <div className={"flex justify-center items-center"}>
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-applicant" : (status == "confirm") ? "bg-past" : "bg-past")}></div>
                <hr className={"block w-28 border-dotted"} />
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-white border border-will" : (status == "confirm") ? "bg-applicant" : "bg-past")}></div>
                <hr className={"block w-28 border-dotted"} />
                <div className={"w-4 h-4 rounded-full block " + ((status == "input") ? "bg-white border border-will" : (status == "confirm") ? "bg-white border border-will" : "bg-applicant")}></div>
            </div>
        </section>
    )
};

export default Progress;