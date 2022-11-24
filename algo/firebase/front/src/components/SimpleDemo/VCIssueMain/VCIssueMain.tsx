import DidInfo from '@/components/DidInfo';
import BackButton from '@/components/BackButton';

import useVCIssueMain from './useVCIssueMain';

const VCIssueMain = () => {
  const {
    vm,
    onVCIssueClickHandler,
    vcIssued,
    vcIssuing,
    issuerDidAccount,
    holderDidAccount,
    issueTimestamp,
  } = useVCIssueMain();
  console.log(issueTimestamp);
  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="w-fit border-dashed border-4 p-4 mb-2">
        証明者が申請者の住民票VCを発行します。
      </p>
      <DidInfo
        name="証明者"
        didAccount={issuerDidAccount}
        timestamp={issueTimestamp}
      />
      <DidInfo name="申請者" didAccount={holderDidAccount} />

      <div className="pt-2">住民票VCの内容</div>
      <textarea value={vm} rows={12} cols={50} readOnly={true}></textarea>
      <div>
        <button
          onClick={onVCIssueClickHandler}
          className="inline-block w-20 border-2 border-blue-500 hover:bg-blue-400 hover:text-white rounded-full text-center mr-4"
        >
          発行
        </button>
        {vcIssuing && <span className="text-yellow-500">Issuing...</span>}
        {vcIssued && <span className="text-blue-500">Done</span>}
      </div>
    </div>
  );
};

export default VCIssueMain;
