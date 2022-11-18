import DidInfo from '../DidInfo';
import BackButton from '../BackButton';
import {
  holderDidAccount,
  verifierDidAccount,
} from '@/lib/algo/account/accounts';
import useSimpleDemoStep4Main from './useSimpleDemoStep4Main';

const SimpleDemoStep4Main = () => {
  const { vm, onVPRequestClickHandler, vpRequested } = useSimpleDemoStep4Main();
  console.log('vm:', vm);

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

export default SimpleDemoStep4Main;
