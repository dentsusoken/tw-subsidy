import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';

import useVPRequestMain from './useVPRequestMain';

const VPRequestMain = () => {
  const {
    vm,
    vpRequested,
    holderDidAccount,
    verifierDidAccount,
    onVPRequestClickHandler,
  } = useVPRequestMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-4 p-4 mb-2">
        申請先が申請者に住民票の提出依頼をします。
      </p>
      <DidInfo name="申請先" didAccount={verifierDidAccount} />
      <DidInfo name="申請者" didAccount={holderDidAccount} />

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
