import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTaxListDoneMain = () => {
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.query.proc === "approve") {
            setTitle("処理完了")
            setMsg("承認処理が完了しました。")
        }
        else if (router.query.proc === "reject") {
            setTitle("処理完了")
            setMsg("却下処理が完了しました。")
        }
        else if (router.query.proc === "delete") {
            setTitle("承認取消完了")
            setMsg("承認を取り消しました。")
        }
    })


    const onSubmit = () => {
        router.push("/37_VCAccept")
    };

    const back = () => {
        router.push('/34_taxList', '/34_taxList');
    }

    return { title, msg, onSubmit, back }
};

export default useTaxListDoneMain;