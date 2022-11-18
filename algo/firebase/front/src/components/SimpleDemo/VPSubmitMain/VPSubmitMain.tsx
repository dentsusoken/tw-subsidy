import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';
import {
  holderDidAccount,
  verifierDidAccount,
} from '@/lib/algo/account/accounts';
import useVPSubmitMain from './useVPSubmitMain';

const VPSubmitMain = () => {
  const { vm, vpSubmitted, onVPSubmitClickHandler } = useVPSubmitMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-2 p-1 mb-2">
        HolderがVerifierに住民票VPを提出します。
      </p>
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Verifier" didAccount={verifierDidAccount} />

      <div className="pt-2">住民票VPの内容</div>
      <textarea value={vm} rows={26} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVPSubmitClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          提出
        </button>
        {vpSubmitted && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default VPSubmitMain;
