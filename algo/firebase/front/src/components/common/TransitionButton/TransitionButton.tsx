import { FormEventHandler, MouseEventHandler } from 'react';

export type TransitionButtonParams = {
    text: string;
    type: "next" | "prev";
    currentUser: "applicant" | "approver";
    isEnabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>
    onSubmit?: FormEventHandler<HTMLButtonElement>
}

const TransitionButton = ({ text, type, currentUser, isEnabled = true, onClick, onSubmit }: TransitionButtonParams) => {
    return (
        <button type='submit' onClick={onClick} onSubmit={onSubmit} disabled={!isEnabled}
            className={
                "w-22 h-12 py-3 rounded-md text-base font-bold " +
                (
                    (type == "next")
                        ? "text-white ml-auto mt-auto " +
                        (isEnabled
                            ? ((currentUser == "applicant")
                                ? "bg-applicant "
                                : "bg-approver ")
                            : "bg-past text-white ")
                        :
                        (isEnabled
                            ? "bg-white text-black border border-past "
                            : "bg-past text-white ")
                )

            }>
            {text}
        </button>
    )
};

export default TransitionButton;