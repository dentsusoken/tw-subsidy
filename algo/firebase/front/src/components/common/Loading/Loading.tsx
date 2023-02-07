export type Loading = {
    isLoading: boolean;
}

const Loading = ({ isLoading }: Loading) => {
    return (
        <>
            {isLoading &&
                <div className={"absolute inset-0 w-screen h-screen bg-blend-overlay bg-color-line-shadow"}>
                    <div className="absolute left-1/2 top-1/3 -translate-x-1/2 flex">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-200 rounded-full border-t-blue-500 duration-500"></div>
                    </div>
                </div>
            }
        </>
    )
};

export default Loading;