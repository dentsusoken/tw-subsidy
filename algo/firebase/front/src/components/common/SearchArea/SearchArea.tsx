import { ChangeEventHandler, KeyboardEventHandler } from "react"

export type SearchAreaParams = {
    value: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

const SearchArea = ({ value, onChange, onKeyDown }: SearchAreaParams) => {
    return (
        <section className={"flex h-16 w-full"}>
                <img src="/search.svg" alt="" className={"my-auto px-4"} />
                <input type="text" placeholder="検索" value={value} className={"w-full text-sm focus:outline-none"} onChange={onChange} onKeyDown={onKeyDown}/>
        </section>
    )
};

export default SearchArea;