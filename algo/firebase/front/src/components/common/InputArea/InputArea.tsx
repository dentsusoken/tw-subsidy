import { Path, FieldValues, useFormContext, RegisterOptions } from 'react-hook-form';

export type InputAreaParams<T> = {
    name: Path<T>;
    label: string;
    validation?: RegisterOptions;
    placeholder?: string;
    isEnabled?: boolean;
    isRequired?: boolean;
};

const InputArea = <T extends FieldValues>({ name, label, validation = undefined, placeholder, isEnabled = true, isRequired = false }: InputAreaParams<T>) => {
    const { register } = useFormContext();

    return (
        <div className={"mb-5"}>
            <label htmlFor="name" className={"block text-sm pb-4"}>{label} {isRequired ? <span className={"text-warnig"}>（必須）</span> : null}</label>
            {isEnabled
                ? <input type="text" id='name' className={"bg-white border border-past w-78 h-10 rounded-md p-2 text-base"} placeholder={placeholder}
                    {...typeof validation === "undefined"
                        ? { ...register(name)} 
                        : { ...register(name, validation) }} />
                : <input disabled type="text" id='name' className={"bg-disabled w-78 h-10 rounded-md p-2 text-base"} placeholder={placeholder} { ...register(name) }/>
            }
        </div>
    )
};

export default InputArea;