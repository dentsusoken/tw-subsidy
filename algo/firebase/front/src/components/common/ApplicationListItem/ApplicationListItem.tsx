import useApplicationListItem, { useApplicationListItemParams } from './useApplicationListItem';

const ApplicationListItem = (params: useApplicationListItemParams) => {
    const { info, approve, revoke } = useApplicationListItem(params);

    return (
        <>
            {!!info ? (
                <li className={"flex items-center w-full h-16 px-3 text-sm border-b border-color-gainsboro"}>

                    <div className={"flex items-center mx-auto"}>
                        <span className={"pr-2"}>{info.applicationDate}</span>
                        <span className={"w-18"}>{info.fullName}</span>
                        <div className={"w-12 h-12"}>
                            {info.verifyStatus ? (<img src="/authenticated.svg" alt="" className="inline-block" />) : ""}
                        </div>
                        <span className={"text-center w-18 " + (info.approvalStatus ? "text-color-gray-accepted" : "text-color-warnig")}>{info.approvalStatus ? "承認済" : "未承認"}</span>
                        <button onClick={info.approvalStatus ? revoke : approve} className={"w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold"}>照会</button>
                    </div>
                </li>
            ) : null}
        </>
    )
};

export default ApplicationListItem;