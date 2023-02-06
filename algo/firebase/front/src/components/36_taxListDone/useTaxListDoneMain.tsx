import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { taxInputState } from '@/lib/states/mockApp';
import { useRecoilValue, useResetRecoilState } from 'recoil';


const useTaxListDoneMain = () => {
    const input = useRecoilValue(taxInputState);
    const [msg, setMsg] = useState("");
    const router = useRouter();
    const reset = useResetRecoilState(taxInputState);

    useEffect(() => {
        if (router.query.proc === "approve") {
            setMsg("承認処理が完了しました。")
        }
        else if (router.query.proc === "reject") {
            setMsg("却下処理が完了しました。")
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

    return { msg, onSubmit, back }
};

export default useTaxListDoneMain;