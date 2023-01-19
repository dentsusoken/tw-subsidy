import { useSetRecoilState, useRecoilValue } from 'recoil';

import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { VCListState } from '@/lib/states/mockApp';
import { useState, useEffect } from 'react';
import { VCListType } from '@/lib/types/mockApp/Form';

const useVCListMain = () => {
    const setSubsidyInput = useSetRecoilState(subsidyInputState)
    const [query, setQuery] = useState("")
    const VCListGlobal = useRecoilValue(VCListState);
    const [VCList, setVCList] = useState<VCListType>()
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);

    useEffect(() => {
        setVCList(VCListGlobal);
        if (VCList) {
            setListCount(VCList.resident.length + VCList.account.length + VCList.tax.length)
            setfilterCount(VCList.resident.length + VCList.account.length + VCList.tax.length)
        }
    }, [VCList]);

    // const filterList = useMemo(() => {
    //     let tmp = VCList.filter(item => item.fullName.includes(query))
    //     return tmp;
    // }, [query])

    // const filter = () => {
    //     setfilterCount(filterList.length)
    // }

    return { VCList, query, listCount, filterCount, setSubsidyInput, setQuery }
};

export default useVCListMain;