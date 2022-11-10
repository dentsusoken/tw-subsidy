import DidInfo from '../DidInfo';
import BackButton from '../BackButton';
import {
  holderDidAccount,
  issuerDidAccount,
} from '@/lib/algo/account/accounts';
import useSimpleDemoStep1MainHook from './SimpleDemoStep1Main.hook';

const SimpleDemoStep1Main = () => {
  const { vm } = useSimpleDemoStep1MainHook();

  return (
    <div>
      <div className="py-2">
        <BackButton url="./simple-demo" />
      </div>
      <p className="pb-2">
        HolderがIssuerに住民票の発行（issue）を依頼します。
      </p>
      <DidInfo name="Holder" didAccount={holderDidAccount} />
      <DidInfo name="Issuer" didAccount={issuerDidAccount} />

      <div className="pt-2">依頼内容</div>
      <textarea value={vm} rows={14} cols={50}></textarea>
    </div>
  );
};

export default SimpleDemoStep1Main;
