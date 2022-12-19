import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import Main from '@/components/4.x/Main';
// import Main from '@/components/1.x/Main';
import TransitionArea from '@/components/common/TransitionArea';
import TransitionButton from '@/components/common/TransitionButton';
import Container from '@/components/common/Container';


const SubsidyListDetail: NextPage = () => {

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <Container title={"申請内容照会"}>
                <Main editable={false} currentUser={"approver"} />
            </Container>
            <TransitionArea>
                <TransitionButton url={"/4.x/46_subsidyListDone"} currentUser={"approver"} type={"prev"} text={"却下"} query={"type=deny"} />
                <TransitionButton url={"/4.x/46_subsidyListDone"} currentUser={"approver"} type={"next"} text={"承認"} query={"type=accept"} />
            </TransitionArea>
        </>
    )
};

export default SubsidyListDetail;