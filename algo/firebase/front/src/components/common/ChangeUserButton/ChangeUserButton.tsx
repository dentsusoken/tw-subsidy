import { MouseEventHandler } from "react";

export type ChangeUserButtonParams = {
    text: string;
    currentUser: "applicant" | "approver";
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ChangeUserButton = ({ text, currentUser, onClick }: ChangeUserButtonParams) => {
    return (
        <button onClick={onClick} className={"block w-40 h-12 py-3 text-base font-bold mx-auto border border-color-gray rounded-md"}>
            {text}
        </button>
    )
};

export default ChangeUserButton;