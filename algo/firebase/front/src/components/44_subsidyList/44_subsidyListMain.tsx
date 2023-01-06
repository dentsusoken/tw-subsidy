import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import ApplicationListItem from '../common/ApplicationListItem';
import useSubsidyListMain from './useSubsidyListMain';

const SubsidyListMain = () => {
    const { query, list, listCount, filterCount, setSubsidyInput, setQuery, filter } = useSubsidyListMain()

    return (
        <>
            <Header />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} onKeyDown={filter} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul>
                    {
                        list.map((item, index) => {
                            return (<ApplicationListItem subsidyInfo={item} key={index} setSubsidyInput={setSubsidyInput} />)
                        })
                    }
                </ul>
            </main>
        </>
    )
};

export default SubsidyListMain;