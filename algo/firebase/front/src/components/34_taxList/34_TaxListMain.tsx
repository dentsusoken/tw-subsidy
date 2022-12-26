import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import ApplicationListItem from '../common/ApplicationListItem';
import useTaxListMain from './useTaxListMain';

const TaxListMain = () => {
    const { query, list, listCount, filterCount, setQuery ,setTaxInput, filter} = useTaxListMain()

    return (
        <>
            <Header />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} onKeyDown={filter} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul className={""}>
                    {
                        list.map((item, index) => {
                            return (<ApplicationListItem taxInfo={item} key={index} setTaxInput={setTaxInput} />)
                        })
                    }
                </ul>
            </main>

        </>
    )
};

export default TaxListMain;