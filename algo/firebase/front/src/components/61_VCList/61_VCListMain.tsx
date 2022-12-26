import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import useVCListMain from './useVCListMain';
import VCListItem from '../common/VCListItem';

const VCListMain = () => {
    const { VCList, query, listCount, filterCount, setQuery, filter } = useVCListMain()

    return (
        <>
            <Header />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} onKeyDown={filter} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul>
                    {!!VCList.resident && <VCListItem vc='住民票' accepted={VCList.resident?.approvalStatus} url="17_VCAccept" />}
                    {!!VCList.account && <VCListItem vc='口座証明書' accepted={VCList.account?.approvalStatus} url="27_VCAccept"/>}
                    {!!VCList.tax && <VCListItem vc='納税証明書' accepted={VCList.tax?.approvalStatus} url="37_VCAccept" />}
                </ul>
            </main>
        </>
    )
};

export default VCListMain;