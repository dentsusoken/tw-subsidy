import useHeaderHook from './Header.hook';

const Header = () => {
  const {
    holderDid,
    issuerDid,
    verifierDid,
    holderBalance,
    issuerBalance,
    verifierBalance,
  } = useHeaderHook();
  return (
    <div>
      <div className="flex">
        <div className="w-16">Role</div>
        <div className="w-44">DID</div>
        <div className="w-32 text-right">Balance</div>
      </div>
      <hr className="w-96 border-t-2" />
      <div className="flex">
        <div className="w-16">Holder</div>
        <div className="w-44">{holderDid}</div>
        <div className="w-32 text-right">
          {holderBalance && <span>{holderBalance} ALGO</span>}
        </div>
      </div>
      <div className="flex">
        <div className="w-16">Issuer</div>
        <div className="w-44">{issuerDid}</div>
        <div className="w-32 text-right">
          {issuerBalance && <span>{issuerBalance} ALGO</span>}
        </div>
      </div>
      <div className="flex">
        <div className="w-16">Verifier</div>
        <div className="w-44">{verifierDid}</div>
        <div className="w-32 text-right">
          {verifierBalance && <span>{verifierBalance} ALGO</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;
