import BackButton from '../BackButton';

import StepStatus from './StepStatus';
import useSimpleDemoMain from './useSimpleDemoMain';

const SimpleDemoMain = () => {
  const { step1Done, step2Done, onClearClickHandler } = useSimpleDemoMain();

  return (
    <div>
      <div className="py-2">
        <BackButton url="." />
      </div>
      <p className="w-fit border-dashed border-2 p-1">
        Step 1から順番に実行しましょう。
        <br />
        各ステップを完了すると
        <span className="text-red-500">Not Yet</span>が
        <span className="text-blue-500">Done</span>に変わります。
        <br />
        各Stepを完了すると次のStepが表示されます。
        <br />
        最後のStepを完了すると、
        <span className="text-blue-500">Congratulations</span>
        が表示されます。
        <br />
        Clearボタンをクリックすると初期状態に戻ります。
      </p>
      <div className="mt-4 flex">
        <div className="w-20 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
          <a href="./simple-demo-step1">Step 1</a>
        </div>
        <div className="w-20 text-center">
          <StepStatus done={step1Done} />
        </div>
      </div>
      {step1Done && (
        <div className="mt-4 flex">
          <div className="w-20 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
            <a href="./simple-demo-step2">Step 2</a>
          </div>
          <div className="w-20 text-center">
            <StepStatus done={step2Done} />
          </div>
        </div>
      )}
      <div className="mt-4 flex">
        <button
          onClick={onClearClickHandler}
          className="inline-block w-20 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SimpleDemoMain;
