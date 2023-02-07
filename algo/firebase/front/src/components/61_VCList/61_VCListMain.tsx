import Header from '@/components/common/Header';
import useVCListMain from './useVCListMain';
import VCListContainer from '../common/VCListContainer';
import Loading from '../common/Loading';


const VCListMain = () => {
    const { residentList, accountList, taxList, isLoading } = useVCListMain()

    return (
        <>
            <Header />
            <main className={""}>
                {!isLoading &&
                    <>
                        <VCListContainer type={"住民票"} items={residentList} />
                        <VCListContainer type={"口座実在証明書"} items={accountList} />
                        <VCListContainer type={"納税証明書"} items={taxList} />
                    </>
                }
                <Loading isLoading={isLoading} />
            </main>
        </>
    )
};

export default VCListMain;