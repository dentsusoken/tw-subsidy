import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import Main from '@/components/4.x/Main';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';

const SubsidyInput: NextPage = () => {

    return (
        <>
            <Header title='補助金申請' currentUser={"applicant"} />
            {/* <Progress status={"input"} /> */}
            <Main editable={true} status="input" currentUser={"applicant"} />
            {/* <TransitionArea>
                <TransitionButton text={"確認"} type={"next"} target={"applicant"} url={"/4.x/42_subsidyConfirm"} />
            </TransitionArea> */}
        </>
    )
};

export default SubsidyInput;