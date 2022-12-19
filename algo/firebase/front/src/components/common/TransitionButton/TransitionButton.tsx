import BaseButton from '../BaseButton';

export type TransitionButtonParams = {
    text: string;
    type: "next" | "prev";
    currentUser: "applicant" | "approver";
    url: string;
    query?: string;
}

const TransitionButton = ({ url, text, type, currentUser, query }: TransitionButtonParams) => {
    return (
        <BaseButton url={url} className={
            "w-22 h-12 py-3 rounded-md text-base font-bold " +
            ((type == "next")
                ? "text-white " + ((currentUser == "applicant")
                    ? "bg-applicant ml-auto mt-auto"
                    : "bg-approver ml-auto mt-auto")
                : "bg-white text-black border border-past")
        }
        query={query}>
            {text}
        </BaseButton>
    )
};

export default TransitionButton;