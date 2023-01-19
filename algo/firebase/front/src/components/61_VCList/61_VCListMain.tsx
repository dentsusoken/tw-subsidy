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
                    {VCList &&
                        <>
                        {VCList.resident.map((value, index) => (<VCListItem key={index} vc={`住民票 - VC${index + 1}`} accepted={value.acceptStatus} url={{pathname:"17_vc-accept",query:{idx:index}}} />))}
                        {VCList.account.map((value, index) => (<VCListItem key={index} vc={`口座証明書 - VC${index + 1}`} accepted={value.acceptStatus} url={{pathname:"27_VCAccept",query:{idx:index}}} />))}
                        {VCList.tax.map((value, index) => (<VCListItem key={index} vc={`納税証明書 - VC${index + 1}`} accepted={value.acceptStatus} url={{pathname:"37_VCAccept",query:{idx:index}}} />))}
                        </>
                    }
                </ul>
            </main>
        </>
    )
};

export default VCListMain;