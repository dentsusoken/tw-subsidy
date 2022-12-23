import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import useSubsidyListDoneMain from './useSubsidyListDoneMain';

const SubsidyListDoneMain = () => {
    const { title, msg ,onSubmit, back } = useSubsidyListDoneMain()

    return (
        <>
            <Header />
            <Container title={title} >
                <div className={"text-center text-sm mb-24 mt-24"}>
                    <p>{msg}</p>
                </div>
                <TransitionArea>
                    <TransitionButton text='申請一覧へ戻る' type={"prev"} currentUser={"approver"} onClick={back} />
                    <TransitionButton text='申請者の画面へ' type={"next"} currentUser={"applicant"} onClick={onSubmit} />
                </TransitionArea>
            </Container>
        </>
    )
};

export default SubsidyListDoneMain;