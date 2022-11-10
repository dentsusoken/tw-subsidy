import BackButton from '../BackButton';

import StepStatus from './StepStatus';

const SimpleDemoMain = () => {
  return (
    <div>
      <div className="py-2">
        <BackButton url="." />
      </div>
      <p>
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
      </p>
      <div className="mt-4 flex">
        <div className="w-20 border-2 border-blue-500 rounded-full text-center hover:bg-blue-400 hover:text-white">
          <a href="./simple-demo-step1">Step 1</a>
        </div>
        <div className="w-20 text-center">
          <StepStatus done={false} />
        </div>
      </div>
    </div>
  );
};

export default SimpleDemoMain;
