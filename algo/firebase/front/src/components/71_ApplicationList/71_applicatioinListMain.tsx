import Header from "../common/Header";

import ApplicationListContainer from "../common/ApplicationListContainer";
import useApplicationListMain from "./useApplicationListMain";
import Loading from "../common/Loading";

const ApplicationListMain = () => {
    const { residentList, accountList, taxList, subsidyList, isLoading } = useApplicationListMain()

    return (
        <>
            <Header />
            {!isLoading &&
                <>
                    <ApplicationListContainer type="resident" items={residentList} />
                    <ApplicationListContainer type="account" items={accountList} />
                    <ApplicationListContainer type="tax" items={taxList} />
                    <ApplicationListContainer type="subsidy" items={subsidyList} />
                </>
            }
            <Loading isLoading={isLoading} />
        </>
    )
};

export default ApplicationListMain;