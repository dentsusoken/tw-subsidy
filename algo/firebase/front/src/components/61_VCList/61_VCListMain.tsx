import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea'
import NumberArea from '../common/NumberArea';
import useVCListMain from './useVCListMain';
import VCListItem from '../common/VCListItem';

const VCListMain = () => {
    const { VCList, query, listCount, filterCount, setQuery } = useVCListMain()

    return (
        <>
            <Header />
            <main className={"mx-auto"}>
                <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
                <NumberArea listCount={listCount} resultCount={filterCount} />
                <ul>
                    {!!VCList.resident && <VCListItem vc='住民票' accepted={VCList.resident.acceptStatus} url="17_vc-accept" />}
                    {!!VCList.account && <VCListItem vc='口座証明書' accepted={VCList.account.acceptStatus} url="27_vc-accept" />}
                    {!!VCList.tax && <VCListItem vc='納税証明書' accepted={VCList.tax.acceptStatus} url="37_VCAccept" />}
                </ul>
            </main>
        </>
    )
};

export default VCListMain;