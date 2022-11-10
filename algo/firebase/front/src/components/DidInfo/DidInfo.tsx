import useDidInfoHook from './DidInfo.hook';

import { UseDidInfoHookParams } from './DidInfo.hook';

const Header = (params: UseDidInfoHookParams) => {
  const { name, did, balance } = useDidInfoHook(params);
  return (
    <div>
      <div className="flex">
        <div className="w-16">{name}</div>
        <div className="w-44">{did}</div>
        <div className="w-32 text-right">
          {balance && <span>{balance} ALGO</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;
