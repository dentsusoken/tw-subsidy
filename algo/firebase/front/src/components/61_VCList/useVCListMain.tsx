import { useSetRecoilState, useRecoilValue } from 'recoil';

import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';
import { SubsidyInputFormType, VCListType } from '@/lib/types/mockApp/Form';
import { useState, useEffect, useMemo } from 'react';

const useVCListMain = () => {
    const setSubsidyInput = useSetRecoilState(subsidyInputState)
    const [query, setQuery] = useState("")
    const subsidyList = useRecoilValue(subsidyListState);
    const taxInputList = useRecoilValue(taxInputListState);
    // const [list, setList] = useState<SubsidyInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);
    const [VCList, setVCList] = useState<VCListType>({});

    useEffect(() => {
        getVCList();
        // setList(subsidyList);
        setListCount(Object.keys(VCList).length)
        setfilterCount(Object.keys(VCList).length)
    }, [Object.keys(VCList).length]);

    const getVCList = () => {
        let tmpVCList:VCListType = {};

        taxInputList.map((value) => {
            if(value.did === "00001"){
                tmpVCList.tax = value
            }
        })

        setVCList(tmpVCList);
    }

    const filterList = useMemo(() => {
        let tmp = subsidyList.filter(item => item.fullName.includes(query))
        return tmp;
    }, [query])

    const filter = () => {
        // setList(filterList);
        setfilterCount(filterList.length)
    }

    return { VCList, query, filterList, listCount, filterCount, setSubsidyInput, setQuery, filter }
};

export default useVCListMain;