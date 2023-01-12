import Header from '@/components/common/Header';
import Container from "../common/Container";
import TransitionButton from "../common/TransitionButton";
import AcceptButton from "../common/AcceptButton";
import useVCAcceptMain from "./useVCAcceptMain";

const VCAcceptMain = () => {
    const { isEnabled, accept, onSubmit } = useVCAcceptMain()


    return (
        <>
            <Header />
            <main>
                <Container>
                    <p className={"text-center text-sm mt-24 mx-auto w-60 leading-relaxed"}>
                        あなたが申請した、
                        <br />
                        納税証明書申請が承認されました。
                        <br />
                        <br />
                        デジタル証明書を受け入れますか？
                    </p>
                </Container>
                <section className={"text-center"}>
                    <AcceptButton isEnable={isEnabled} onClick={accept} />
                    <TransitionButton text="VC一覧へ" type={"prev"} currentUser={"applicant"} onClick={onSubmit} />
                </section>
            </main>
        </>
    )
}

export default VCAcceptMain