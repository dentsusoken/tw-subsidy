import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { subsidyInputState } from '@/lib/states/mockApp';
import { useRecoilValue, useResetRecoilState } from 'recoil';

const useSubsidyListDoneMain = () => {
    const input = useRecoilValue(subsidyInputState)
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const reset = useResetRecoilState(subsidyInputState);

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
        router.push("/00_menu")
    };

    const back = () => {
        reset();
        router.push('/44_subsidyList', '/44_subsidyList');
    }

    return { title, msg, onSubmit, back }
};

export default useSubsidyListDoneMain;