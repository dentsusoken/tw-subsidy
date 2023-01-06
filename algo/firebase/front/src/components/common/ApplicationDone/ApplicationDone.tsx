import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import Progress from '@/components/common/Progress';
import ChangeUserButton from '@/components/common/ChangeUserButton';
import useApplicationDone from './useApplicaitonDone';


const ApplicationDone = () => {
    const { msg, changeUser } = useApplicationDone()

    return (
        <>
            <Header />
            <main>
            <Progress status={"done"} />
                <Container className='mt-16'>
                    <div className={"text-center text-sm mb-24"}>
                        <p>{msg}が完了しました。</p>
                        <p>承認されるまでお待ちください。</p>
                    </div>
                    <ChangeUserButton text={"承認者の画面へ"} currentUser={"applicant"} onClick={changeUser}/>
                </Container>
            </main>

        </>
    )
};

export default ApplicationDone;