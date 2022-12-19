import Container from '@/components/common/Container';
import CheckBox from '@/components/common/CheckBox';
import InputArea from '@/components/common/InputArea';
import TransitionButton from '@/components/common/TransitionButton';
import TransitionArea from '@/components/common/TransitionArea';
import Progress from '@/components/common/Progress';
import { useState } from 'react';
import useMain from "./useMain"

export type MainParams = {
    editable: boolean;
    status?: "input" | "confirm" | "done";
    currentUser: "applicant" | "approver";
}

const Main = ({ editable, status, currentUser }: MainParams) => {
    const [name, setName] = useState("山田太郎")
    const [address, setAddress] = useState("東京都渋谷区xxxxxx")
    // const [residence, setResidence] = useState(true)
    // const [residence, setResidence] = useRecoilState(residenceState)
    // const [isAccountCertificate, setIsAccountCertificate] = useState(true)
    // const [isTaxCertificate, setIsTaxCertificate] = useState(false)
    const { applicationDocsGlobal, setApplicationDocsGlobal } = useMain()

    return (
        <>
            {
                !!status
                    ? <Progress status={status} />
                    : null
            }
            <Container title={"申請書類の選択"}>
                <ul className={"border-y border-li"}>
                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                        <CheckBox label={"住民票"} isChecked={applicationDocsGlobal.isResidenceCertificate} isEnabled={editable} onClick={() => { setApplicationDocsGlobal((prev) => ({ ...prev, isResidenceCertificate: !applicationDocsGlobal.isResidenceCertificate })) }} />
                    </li>
                    <li className={"py-3 pl-4 pr-6 w-78 flex border-y border-li"}>
                        <CheckBox label={"口座実在証明書"} isChecked={applicationDocsGlobal.isAccountCertificate} isEnabled={editable} onClick={() => { setApplicationDocsGlobal((prev) => ({ ...prev, isAccountCertificate: !applicationDocsGlobal.isAccountCertificate })) }} />
                    </li>
                    <li className={"py-3 pl-4 pr-6 w-78 flex"}>
                        <CheckBox label={"納税証明書"} isChecked={applicationDocsGlobal.isTaxCertificate} isEnabled={editable} onClick={() => { setApplicationDocsGlobal((prev) => ({ ...prev, isTaxCertificate: !applicationDocsGlobal.isTaxCertificate })) }} />
                    </li>
                </ul>
            </Container>
            <Container title={"申請者情報"}>
                <div>
                    <InputArea label='申請者名' placeholder='' value={name} enabled={false} onChange={(e) => setName(e.currentTarget.value)} />
                </div>
                <div>
                    <InputArea label='申請者住所' placeholder='' value={address} enabled={false} onChange={(e) => setAddress(e.currentTarget.value)} />
                </div>
            </Container>
            <TransitionArea>
                {
                // (currentUser == "approver")
                //     ? (<><TransitionButton url={"/4.x/46_subsidyListDone"} currentUser={"approver"} type={"prev"} text={"却下"} query={"type=deny"} />
                //         <TransitionButton url={"/4.x/46_subsidyListDone"} currentUser={"approver"} type={"next"} text={"承認"} query={"type=accept"} /></>)
                //     :
                     !!status
                        ? (status == "input")
                            ? <TransitionButton text={"確認"} type={"next"} currentUser={currentUser} url={"/4.x/42_subsidyConfirm"} />
                            : (status == "confirm")
                                ? (<><TransitionButton text={"戻る"} type={"prev"} currentUser={currentUser} url={"/4.x/41_subsidyInput"} />
                                    <TransitionButton text={"申請"} type={"next"} currentUser={currentUser} url={"/4.x/43_subsidyDone"} /></>)
                                : null
                        : null
                }
                {/* <TransitionButton text={"戻る"} type={"prev"} target={"applicant"} url={"/4.x/41_subsidyInput"} />
                <TransitionButton text={"申請"} type={"next"} target={"applicant"} url={"/4.x/43_subsidyDone"} /> */}
            </TransitionArea>
        </>
    )
};

export default Main;