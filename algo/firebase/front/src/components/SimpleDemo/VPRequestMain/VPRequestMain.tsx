import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';
import {
  holderDidAccount,
  verifierDidAccount,
} from '@/lib/algo/account/accounts';
import useVPRequestMain from './useVPRequestMain';

const VPRequestMain = () => {
  const { vm, vpRequested, onVPRequestClickHandler } = useVPRequestMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-2 p-1 mb-2">
        VerifierがHolderに住民票の提出依頼をします。
      </p>
      <DidInfo name="Verifier" didAccount={verifierDidAccount} />
      <DidInfo name="Holder" didAccount={holderDidAccount} />

      <div className="pt-2">住民票の提出依頼内容</div>
      <textarea value={vm} rows={10} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVPRequestClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          依頼
        </button>
        {vpRequested && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default VPRequestMain;
