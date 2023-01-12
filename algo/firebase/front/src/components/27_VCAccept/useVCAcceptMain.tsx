import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { VCListState } from '@/lib/states/mockApp';

const useVCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);
    const [VCList, setVCList] = useRecoilState(VCListState);

    useEffect(() => {
        if (VCList.account && VCList.account.acceptStatus) {
            setIsEnabled(false)
        }
    }, [isEnabled, VCList])

    const accept = async () => {
        setIsEnabled(!isEnabled);
        setVCList((items) => (items.account ? { ...items, account: { ...items.account, acceptStatus: true } } : items));
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;