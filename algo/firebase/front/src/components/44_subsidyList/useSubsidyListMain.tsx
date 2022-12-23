import { useSetRecoilState, useRecoilValue } from 'recoil';

import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { useState, useEffect, useMemo } from 'react';

const useSubsidyListMain = () => {
    const setSubsidyInput = useSetRecoilState(subsidyInputState)
    const [query, setQuery] = useState("")
    const subsidyList = useRecoilValue(subsidyListState);
    const [list, setList] = useState<SubsidyInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);

    useEffect(() => {
        setList(subsidyList);
        setListCount(subsidyList.length)
        setfilterCount(subsidyList.length)
    }, [subsidyList.length]);

    const filterList = useMemo(() => {
        let tmp = subsidyList.filter(item => item.fullName.includes(query))
        return tmp;
    }, [query])


    const filter = () => {
        setList(filterList);
        setfilterCount(filterList.length)
    }


    return { query, list, filterList, listCount, filterCount, setSubsidyInput, setQuery, filter }
};

export default useSubsidyListMain;