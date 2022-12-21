import { MouseEventHandler } from "react";
import BaseButton from "../BaseButton";

export type ChangeUserButtonParams = {
    text: string;
    currentUser: "applicant" | "approver";
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const ChangeUserButton = ({ text, currentUser, onClick }: ChangeUserButtonParams) => {
    return (
        <button onClick={onClick} className={
            "block w-40 h-12 py-3 rounded-md text-base font-bold text-white mx-auto " +
            ((currentUser == "applicant")
                ? "bg-approver"
                : "bg-applicant ")
        }>
            {text}
        </button>
    )
};

export default ChangeUserButton;