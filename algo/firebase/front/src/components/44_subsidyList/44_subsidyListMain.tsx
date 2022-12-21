import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import ApplicationList from '../common/ApplicationList';

import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { useState, useEffect, useMemo } from 'react';

const SubsidyListMain = () => {
    const setSubsidyInput = useSetRecoilState(subsidyInputState)
    const [query, setQuery] = useState("")
    const subsidyList = useRecoilValue(subsidyListState);
    const [list, setList] = useState<SubsidyInputFormType[]>([]);
    const [listCount, setListCount] = useState(0);
    const [filterCount, setfilterCount] = useState(0);
    const errorHandler = useErrorHandler();

    const filterList = useMemo(() => {
        let tmp = subsidyList.filter(item => item.fullName.includes(query))
        return tmp;
    }, [query])

    useEffect(() => {
        try {
            setList(subsidyList);
            setListCount(subsidyList.length)
            setfilterCount(subsidyList.length)
        } catch (e) {
            errorHandler(e);
        }
    }, [subsidyList.length, errorHandler]);

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} onKeyDown={() => {
                    setList(filterList);
                    setfilterCount(filterList.length)
                }} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul>
                    {
                        list.map((item, index) => {
                            return (<ApplicationList subsidyInfo={item} key={index} url="/45_subsidyListDetail" setSubsidyInput={setSubsidyInput} />)
                        })
                    }
                </ul>
            </main>

        </>
    )
};

export default SubsidyListMain;