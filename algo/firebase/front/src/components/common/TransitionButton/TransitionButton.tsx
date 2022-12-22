import { FormEventHandler, MouseEventHandler } from 'react';

export type TransitionButtonParams = {
    text: string;
    type: "next" | "prev" | "warnig";
    currentUser: "applicant" | "approver";
    onClick?: MouseEventHandler<HTMLButtonElement>
    onSubmit?: FormEventHandler<HTMLButtonElement>
}

const TransitionButton = ({ text, type, currentUser, onClick, onSubmit }: TransitionButtonParams) => {
    return (
        <button type='submit' onClick={onClick} onSubmit={onSubmit}
            className={
                "min-w-22 w-auto h-12 py-3 px-2 rounded-md text-base font-bold " +
                (
                    (type == "next")
                        ? "text-white ml-auto mt-auto " +
                        ((currentUser == "applicant")
                            ? "bg-color-green "
                            : "bg-color-blue ")
                        : ((type == "warnig")
                            ? "text-white ml-auto mt-auto bg-color-warnig"
                            : "bg-white text-black border border-color-grey ")
                )
            }>
            {text}
        </button >
    )
};

export default TransitionButton;