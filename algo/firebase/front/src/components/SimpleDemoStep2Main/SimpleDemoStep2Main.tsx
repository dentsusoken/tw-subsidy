import DidInfo from '../DidInfo';
import BackButton from '../BackButton';
import {
  holderDidAccount,
  issuerDidAccount,
} from '@/lib/algo/account/accounts';
import useSimpleDemoStep2Main from './useSimpleDemoStep2Main';

const SimpleDemoStep2Main = () => {
  const { vm, onVCRequestVerifiedClickHandler, vcRequestVerified } =
    useSimpleDemoStep2Main();
  console.log('vm:', vm);

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-2 p-1 mb-2">
        IssuerがHolderの住民票の発行依頼を検証します。
      </p>
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Issuer" didAccount={issuerDidAccount} />

      <div className="pt-2">住民票の発行依頼内容</div>
      <textarea value={vm} rows={12} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVCRequestVerifiedClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          検証
        </button>
        {vcRequestVerified && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default SimpleDemoStep2Main;
