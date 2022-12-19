import BaseButton from "../BaseButton";

export type ChangeUserButtonParams = {
    url: string;
    text: string;
    currentUser: "applicant" | "approver";
};

const ChangeUserButton = ({ url, text, currentUser }: ChangeUserButtonParams) => {
    return (
        <BaseButton url={url} className={
            "w-40 h-12 py-3 rounded-md text-base font-bold text-white mx-auto " +
            ((currentUser == "applicant")
                ? "bg-approver"
                : "bg-applicant ")
        }>
            {text}
        </BaseButton>
    )
};

export default ChangeUserButton;