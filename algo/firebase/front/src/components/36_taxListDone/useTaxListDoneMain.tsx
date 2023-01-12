import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { taxInputState } from '@/lib/states/mockApp';
import { useRecoilValue, useResetRecoilState } from 'recoil';


const useTaxListDoneMain = () => {
    const input = useRecoilValue(taxInputState);
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();
    const reset = useResetRecoilState(taxInputState);

    useEffect(() => {
        if (router.query.proc === "approve") {
            setTitle("処理完了")
            setMsg(input.fullName + " 様の承認処理が完了しました。")
        }
        else if (router.query.proc === "reject") {
            setTitle("処理完了")
            setMsg(input.fullName + " 様の却下処理が完了しました。")
        }
        else if (router.query.proc === "delete") {
            setTitle("承認取消完了")
            setMsg(input.fullName + " 様の承認を取り消しました。")
        }
    })


    const onSubmit = () => {
        reset();
        router.push("/37_VCAccept")
    };

    const back = () => {
        reset();
        router.push('/34_taxList', '/34_taxList');
    }

    return { title, msg, onSubmit, back }
};

export default useTaxListDoneMain;