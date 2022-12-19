import { ChangeEventHandler } from "react";

export type InputAreaParams = {
    label: string;
    placeholder?: string;
    value: string;
    enabled?: boolean;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

const InputArea = ({ label, placeholder, value = "", enabled = true ,required = false, onChange }: InputAreaParams) => {
    return (
        <div className={"mb-5"}>
            <label htmlFor="name" className={"block text-sm pb-4"}>{label} {required?<span className={"text-warnig"}>（必須）</span>:null}</label>
            {enabled
                ? <input value={value} type="text" id='name' className={"bg-white border border-past w-78 h-10 rounded-md p-2 text-base"} placeholder={placeholder} onChange={onChange} />
                : <input value={value} disabled type="text" id='name' className={"bg-disabled w-78 h-10 rounded-md p-2 text-base"} placeholder={placeholder} />
            }
        </div>
    )
};

export default InputArea;