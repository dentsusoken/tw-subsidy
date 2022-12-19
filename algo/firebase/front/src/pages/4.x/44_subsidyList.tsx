import type { NextPage } from 'next';
import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea/SearchArea';
import NumberArea from '@/components/common/NumberArea';
import ApplicationList from '@/components/common/ApplicationList';
import { useState, KeyboardEvent } from 'react';
import { applicationInfoType } from "@/lib/types/4.x";

const SubsidyList: NextPage = () => {
    const [search, setSearch] = useState("")
    const obj1: applicationInfoType = { date: new Date("2022-10-13"), name: "山田太郎", authenticated: true };
    const obj2: applicationInfoType = { date: new Date(), name: "xxxxx", authenticated: false };
    const obj3: applicationInfoType = { date: new Date(), name: "xxxxx", authenticated: false };
    const obj4: applicationInfoType = { date: new Date(), name: "xxxxx", authenticated: true };
    const obj5: applicationInfoType = { date: new Date(), name: "xxxxx", authenticated: false };
    const [list, setList] = useState([obj1, obj2, obj3, obj4, obj5])

    const test = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key);
        console.log(e.keyCode);
    }

    return (
        <>
            <Header title='補助金申請一覧' currentUser={"approver"} />
            <div className={"mx-auto"}>
                <SearchArea value={search} onChange={(e) => setSearch(e.currentTarget.value)} onKeyDown={(e) => test(e)} />
                <NumberArea dividend={5} divisor={5} />
                <ul>
                    {
                        list.map((value, index) => {
                            return (<ApplicationList applicationInfo={value} key={index} />)
                        })
                    }
                </ul>
            </div>

        </>
    )
};

export default SubsidyList;