import Header from '@/components/common/Header';
import useVCListMain from './useVCListMain';
import VCListContainer from '../common/VCListContainer';


const VCListMain = () => {
    const { residentVCList, accountVCList, taxVCList } = useVCListMain()

    return (
        <>
            <Header />
            <main className={"mx-auto"}>
                <VCListContainer type={"住民票"} items={residentVCList} />
                <VCListContainer type={"口座実在証明書"} items={accountVCList} />
                <VCListContainer type={"納税証明書"} items={taxVCList} />
            </main>
        </>
    )
};

export default VCListMain;