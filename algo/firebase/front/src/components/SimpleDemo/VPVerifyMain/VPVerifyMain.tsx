import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';
import {
  holderDidAccount,
  verifierDidAccount,
  issuerDidAccount,
} from '@/lib/algo/account/accounts';
import useVPVerifyMain from './useVPVerifyMain';

const VPSubmitMain = () => {
  const { vm, vpVerified, onVPVerifyClickHandler } = useVPVerifyMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-2 p-1 mb-2">
        Verifierが住民票VPを検証します。
      </p>
      <DidInfo name="Verifier" didAccount={verifierDidAccount} />
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Issuer" didAccount={issuerDidAccount} />

      <div className="pt-2">住民票VPの内容</div>
      <textarea value={vm} rows={26} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVPVerifyClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          検証
        </button>
        {vpVerified && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default VPSubmitMain;
