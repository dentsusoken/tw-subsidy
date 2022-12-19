import { MouseEventHandler } from "react";

export type CheckBoxParams = {
    label: string;
    isChecked: boolean;
    isEnabled?: boolean;
    onClick?: MouseEventHandler<HTMLImageElement>;
    // onClick?: MouseEventHandler<HTMLInputElement>;
}

const CheckBox = ({ label, isChecked, isEnabled = true, onClick }: CheckBoxParams) => {

    return (
        <>
            <span className={"text-sm inline-block"}>{label}</span>
            {isChecked
                ? isEnabled
                    ? <img src="/checked.svg" onClick={onClick} className={"inline-block ml-auto"} />
                    : <img src="/checked_disabled.svg" className={"inline-block ml-auto"} />
                : isEnabled
                    ? <img src="/unchecked.svg" onClick={onClick} className={"inline-block ml-auto"} />
                    : <img src="/unchecked_disabled.svg" className={"inline-block ml-auto"} />
            }
        </>
    )

};

export default CheckBox;