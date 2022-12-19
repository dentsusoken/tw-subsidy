import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import Main from '@/components/4.x/Main';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';

const SubsidyConfirm: NextPage = () => {

    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            {/* <Progress status={"confirm"} /> */}
            <Main editable={false} status="confirm" currentUser={"applicant"}/>
            {/* <TransitionArea>
                <TransitionButton text={"戻る"} type={"prev"} target={"applicant"} url={"/4.x/41_subsidyInput"} />
                <TransitionButton text={"申請"} type={"next"} target={"applicant"} url={"/4.x/43_subsidyDone"} />
            </TransitionArea> */}
        </>
    )
};

export default SubsidyConfirm;