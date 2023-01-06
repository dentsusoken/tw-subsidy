import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

import { useState, useEffect, useMemo } from 'react';

const useTaxListMain = () => {
    const setTaxInput = useSetRecoilState(taxInputState);
    const [query, setQuery] = useState("");
    const taxInputList = useRecoilValue(taxInputListState);
    const [list, setList] = useState<TaxInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);

    useEffect(() => {
        setList(taxInputList);
        setListCount(taxInputList.length)
        setfilterCount(taxInputList.length)
    }, [taxInputList.length]);

    const filterList = useMemo(() => {
        let tmp = taxInputList.filter(item => item.fullName.includes(query))
        return tmp;
    }, [query])

    const filter = () => {
        setList(filterList);
        setfilterCount(filterList.length)
    }

    return { query, list, listCount, filterCount, filterList, setQuery, setTaxInput, filter }


};

export default useTaxListMain;