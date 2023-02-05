import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState, taxInputListState, taxVCListState, taxVCRequestListState } from '@/lib/states/mockApp';


import { useState, useEffect, useMemo } from 'react';

const useTaxListMain = () => {
    const setTaxInput = useSetRecoilState(taxInputState);
    const VCRequestlistState = useRecoilValue(taxVCRequestListState);
    const VClistState = useRecoilValue(taxVCListState);
    const [query, setQuery] = useState("");
    const taxInputList = useRecoilValue(taxInputListState);
    const [list, setList] = useState<TaxInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);


    useEffect(() => {
        // const verifiedList: TaxInputFormType[] = VClistState.map((item) => item.message.content.content);
        const requestList: TaxInputFormType[] = VCRequestlistState.map((item) => item.message.content)
        // const mergeList: TaxInputFormType[] = verifiedList.concat(requestList)
        setList(requestList);
        setListCount(VCRequestlistState.length)
        setfilterCount(VCRequestlistState.length)
    }, [VCRequestlistState.length]);

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