import DidInfo from '../DidInfo';
import BackButton from '../BackButton';
import {
  holderDidAccount,
  issuerDidAccount,
} from '@/lib/algo/account/accounts';
import useSimpleDemoStep1Main from './useSimpleDemoStep1Main';

const SimpleDemoStep1Main = () => {
  const { vm, onVCRequestClickHandler, vcRequest } = useSimpleDemoStep1Main();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="pb-2">
        HolderがIssuerに住民票の発行（issue）を依頼します。
      </p>
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Issuer" didAccount={issuerDidAccount} />

      <div className="pt-2">依頼内容</div>
      <textarea value={vm} rows={14} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVCRequestClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          依頼
        </button>
        {vcRequest && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default SimpleDemoStep1Main;
