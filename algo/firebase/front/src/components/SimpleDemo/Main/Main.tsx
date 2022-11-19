import BackButton from '@/components/BackButton';

import StepStatus from './StepStatus';
import useSimpleDemoMain from './useMain';

const Main = () => {
  const {
    vcRequested,
    vcIssued,
    vpRequested,
    vpSubmitted,
    vpVerified,
    onClearClickHandler,
    clearing,
  } = useSimpleDemoMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="." />
      </div>
      <p className="w-fit border-dashed border-2 p-1">
        上から順番に実行しましょう。
        <br />
        各ステップを完了すると
        <span className="text-red-500">Not Yet</span>が
        <span className="text-blue-500">Done</span>に変わります。
        <br />
        各Stepを完了すると次のStepが実行できるようになります。
        <br />
        Clearボタンをクリックすると初期状態に戻ります。
      </p>
      <div className="mt-4 flex">
        {!vcRequested && !clearing ? (
          <div className="w-56 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-vcrequest">住民票VCの発行依頼</a>
          </div>
        ) : (
          <div className="w-56 text-center">住民票VCの発行依頼</div>
        )}
        <div className="w-20 text-center">
          <StepStatus done={vcRequested} />
        </div>
      </div>

      <div className="mt-4 flex">
        {vcRequested && !vcIssued ? (
          <div className="w-56 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-vcissue">住民票VCの発行</a>
          </div>
        ) : (
          <div className="w-56 text-center">住民票VCの発行</div>
        )}
        <div className="w-20 text-center">
          <StepStatus done={vcIssued} />
        </div>
      </div>

      <div className="mt-4 flex">
        {vcIssued && !vpRequested ? (
          <div className="w-56 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-vprequest">住民票VPの提出依頼</a>
          </div>
        ) : (
          <div className="w-56 text-center">住民票VPの提出依頼</div>
        )}
        <div className="w-20 text-center">
          <StepStatus done={vpRequested} />
        </div>
      </div>

      <div className="mt-4 flex">
        {vpRequested && !vpSubmitted ? (
          <div className="w-56 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-vpsubmit">住民票VPの提出</a>
          </div>
        ) : (
          <div className="w-56 text-center">住民票VPの提出</div>
        )}
        <div className="w-20 text-center">
          <StepStatus done={vpSubmitted} />
        </div>
      </div>

      <div className="mt-4 flex">
        {vpSubmitted && !vpVerified ? (
          <div className="w-56 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-vpverify">住民票VPの検証</a>
          </div>
        ) : (
          <div className="w-56 text-center">住民票VPの検証</div>
        )}
        <div className="w-20 text-center">
          <StepStatus done={vpVerified} />
        </div>
      </div>

      <div className="mt-4 flex">
        <button
          onClick={onClearClickHandler}
          className="inline-block w-20 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white mr-4"
        >
          Clear
        </button>
        {clearing && <span className="text-yellow-500">Clearing...</span>}
      </div>
    </div>
  );
};

export default Main;
