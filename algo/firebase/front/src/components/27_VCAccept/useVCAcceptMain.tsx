import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { VCListState } from '@/lib/states/mockApp';

const useVCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);
    const [idx, setIdx] = useState(0);
    const [VCList, setVCList] = useRecoilState(VCListState);

    useEffect(() => {
        if (typeof router.query.idx === "string") {
            setIdx(parseInt(router.query.idx))
        }
        if (!router.query.idx) {
            console.log(VCList.account.length);
            setIdx(VCList.account.length - 1)
        }        
        if (VCList.account && VCList.account[idx].acceptStatus) {
            setIsEnabled(false)
        }
        else {
            setIsEnabled(true);
        }
    }, [isEnabled, VCList])

    const accept = async () => {
        setIsEnabled(!isEnabled);
        const replaceData = VCList.account.map((value, index) => index === idx ? { VC: value.VC, acceptStatus: true } : value)
        setVCList((items) => (items.account ? { ...items, account: replaceData } : items));
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;