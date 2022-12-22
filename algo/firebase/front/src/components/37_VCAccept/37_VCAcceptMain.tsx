import { useState } from "react"
import { useRouter } from "next/router";

import Header from '@/components/common/Header';
import Container from "../common/Container";
import TransitionButton from "../common/TransitionButton";
import AcceptButton from "../common/AcceptButton";

const VCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);

    const delay = (ms: number | undefined) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async () => {
        setIsEnabled(!isEnabled);

        await delay(2000);

        router.push("00_menu", "00_menu")
    }


    return (
        <>
            <Header currentUser={"applicant"} title={"納税証明書の受け入れ"} />
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
                    <AcceptButton isEnable={isEnabled} onClick={onSubmit} />
                    <TransitionButton text="VC一覧へ" type={"prev"} currentUser={"applicant"} onClick={() => router.push("/61_VCList")} />
                </section>
            </main>
        </>
    )
}

export default VCAcceptMain