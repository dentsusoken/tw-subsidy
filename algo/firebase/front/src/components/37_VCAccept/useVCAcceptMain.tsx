import { useState, useEffect } from "react"
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
            console.log(VCList.tax.length);
            setIdx(VCList.tax.length - 1)
        }
        if (VCList.tax && VCList.tax[idx].acceptStatus) {
            setIsEnabled(false)
        } else {
            setIsEnabled(true)
        }
    }, [isEnabled, VCList])

    const accept = async () => {
        setIsEnabled(!isEnabled);
        const replaceData = VCList.tax.map((value, index) => index === idx ? { VC: value.VC, acceptStatus: true } : value)
        setVCList((items) => (items.tax ? { ...items, tax: replaceData } : items));
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;