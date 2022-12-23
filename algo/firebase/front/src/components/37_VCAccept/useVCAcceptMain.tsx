import { useState } from "react"
import { useRouter } from "next/router";

const useVCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);

    const delay = (ms: number | undefined) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const accept = async () => {
        setIsEnabled(!isEnabled);
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;