import { useState } from "react"
import { useRouter } from "next/router";

import Header from '@/components/common/Header';
import Container from "../common/Container";
import TransitionArea from "../common/TransitionArea";
import TransitionButton from "../common/TransitionButton";

const VCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);

    const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async () => {
        setIsEnabled(!isEnabled);

        await delay(2000);

        router.push("00_menu","00_menu")
    }


    return (
        <>
            <Header currentUser={"applicant"} title={"納税証明書の受け入れ"} />
            <main>
                <Container>
                    <div className={"text-center text-sm mb-24 mt-24 mx-auto w-60 h-36 leading-relaxed"}>
                        <p>
                            あなたが申請した、
                            <br />
                            納税証明書申請が承認されました。
                            <br />
                            <br />
                            デジタル証明書を受け入れますか？
                        </p>
                    </div>
                    <div className={"w-60 mx-auto"}>
                        <TransitionArea>
                            <TransitionButton text={"却下"} currentUser={"applicant"} type={"prev"} isEnabled={isEnabled} onClick={onSubmit}/>
                            <TransitionButton text={"受入"} currentUser={"applicant"} type={"next"} isEnabled={isEnabled} onClick={onSubmit} />
                        </TransitionArea>
                    </div>
                </Container>
            </main>
        </>
    )
}

export default VCAcceptMain