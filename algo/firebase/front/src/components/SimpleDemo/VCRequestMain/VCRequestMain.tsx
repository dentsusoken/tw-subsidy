import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';
import {
  holderDidAccount,
  issuerDidAccount,
} from '@/lib/algo/account/accounts';
import useVCRequestMain from './useVCRequestMain';

const VCRequestMain = () => {
  const { vm, onVCRequestClickHandler, vcRequested } = useVCRequestMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-2 p-1 mb-2">
        HolderがIssuerに住民票の発行（issue）を依頼します。
      </p>
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Issuer" didAccount={issuerDidAccount} />

      <div className="pt-2">依頼内容</div>
      <textarea value={vm} rows={12} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVCRequestClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          依頼
        </button>
        {vcRequested && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default VCRequestMain;
