import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

const useVCAcceptMain = () => {
    const router = useRouter();
    const [input, setInput] = useRecoilState(taxInputState);
    const [listState, setListState] = useRecoilState(taxInputListState);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        listState.map((value) => {
            if (value.did === "00001"){
                setInput(value);
                setIsEnabled(!value.approvalStatus);
            }
        })
    })

    const delay = (ms: number | undefined) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const accept = async () => {
        setIsEnabled(!isEnabled);

        const replaceData: TaxInputFormType = {
            ...input,
            approvalStatus: true,
        }

        const updateData = listState.map((item) => {
            if (item.id === replaceData.id) {
                return replaceData;
            }
            else {
                return item;
            }
        })

        setListState(updateData);
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;