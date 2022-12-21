import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import ApplicationList from '../common/ApplicationList';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import { taxInputState } from '@/lib/states/mockApp/taxInputState';
import { taxInputListState } from '@/lib/states/mockApp/taxInputListState';

import { useState, useEffect, useMemo } from 'react';

const TaxListMain = () => {
    const setTaxInput = useSetRecoilState(taxInputState)
    const [query, setQuery] = useState("")
    const taxInputList = useRecoilValue(taxInputListState);
    const [list, setList] = useState<TaxInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);
    const errorHandler = useErrorHandler();

    const filterList = useMemo(() => {
        let tmp = taxInputList.filter(item => item.fullName.includes(query))
        return tmp;
    }, [query])

    useEffect(() => {
        try {
            setList(taxInputList);
            setListCount(taxInputList.length)
            setfilterCount(taxInputList.length)
        } catch (e) {
            errorHandler(e);
        }
    }, [taxInputList.length, errorHandler]);

    return (
        <>
            <Header title='納税証明書交付申請一覧' currentUser={"approver"} />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} onKeyDown={() => {
                    setList(filterList);
                    setfilterCount(filterList.length)
                }} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul>
                    {
                        list.map((item, index) => {
                            return (<ApplicationList taxInfo={item} key={index} url="/35_taxListDetail" setTaxInput={setTaxInput} />)
                        })
                    }
                </ul>
            </main>

        </>
    )
};

export default TaxListMain;