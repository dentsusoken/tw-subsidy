import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { Path, FieldValues, useFormContext, RegisterOptions } from 'react-hook-form';


export type CheckBoxParams<T> = {
    name: Path<T>
    label: string;
    items: VerifiableMessage<VerifiableCredentialContent<unknown>>[];
    validation?: RegisterOptions;
    currentVal?: string;
}


const VCSelect = <T extends FieldValues>({ name, label, items, validation = undefined, currentVal }: CheckBoxParams<T>) => {
    const { register } = useFormContext();
    const [select, SetSelect] = useState("")

    useEffect(() => {
        if (typeof currentVal === "string" && currentVal !== "") {
            SetSelect(currentVal);
        }
    }, [currentVal, select])

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        SetSelect(e.target.value);
    }

    return (
        <>
            <div className={"relative w-[281px] h-[44px]"}>
                <select value={select} className={"appearance-none w-full h-full px-2  border border-color-gray rounded-lg text-base"}
                    {...typeof validation === "undefined" ? { ...register(name) } : { ...register(name, validation) }}
                    onChange={change}
                >
                    {items.length !== 0
                        ? items.map((value, index) => (
                            <option value={index} key={index}>{label} - VC{index + 1}</option>
                        ))
                        : <option></option>
                    }
                </select>
                <label htmlFor={name} className={"absolute left-0 top-1/2 translate-x-2 -translate-y-1/2"}>{select === "" || currentVal === "" ? label : null}</label>
                <svg className={"absolute right-0 top-1/2 -translate-x-2 -translate-y-1/2"} width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 0L0.000143051 0L10.5001 10L21 0Z" fill="#00938A" />
                </svg>
            </div>
        </>
    )
};

export default VCSelect;