import { issuerPw } from '@/lib/algo/account/accounts';
import { getAlgod } from '@/lib/algo/algod/algods';
import {
  revokeVerifiableCredential,
  verifyVerifiableCredential,
} from '@/lib/algosbt';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { verifyVPResultType } from '@/lib/hooks/MockApp/useVerifyHandler';
import chainState from '@/lib/states/chainState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';
import { VCListState } from '@/lib/states/mockApp';
import { SubsidyInputFormType, SubsidyVCType } from '@/lib/types/mockApp';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { SubsidyInquiry } from '../common/Forms';
import Header from '../common/Header';
import Loading from '../common/Loading';

const SubsidyVCListDetailMain = () => {
  const router = useRouter();
  const VCListGlobal = useRecoilValue(VCListState);
  const { verifyVCHandler, verifyVPHandler } = useVerifyHandler();
  const [verifyResult, setVerifyResult] = useState<boolean>();
  const [verifyVPResult, setVerifyVPResult] = useState<verifyVPResultType>();
  const [input, setInput] = useState<SubsidyInputFormType>();
  const [revokeStatus, setRevokeStatus] = useState(true);
  const chain = useRecoilValue(chainState);
  const [vc, setVC] = useState<SubsidyVCType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState(false);
  const issuerDidAccountGlobal = useRecoilValue(issuerDidAccountState);
  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(() => true);
        const algod = getAlgod(chain);
        const id = router.query.id;
        const SubsidyVC = VCListGlobal.subsidy.find(
          (v) => v.message.content.content.id === Number(id)
        );
        if (SubsidyVC) {
          const revoke = await verifyVerifiableCredential(algod, SubsidyVC);
          const verifyVC = verifyVCHandler(SubsidyVC);
          const verifyVP = await verifyVPHandler(
            SubsidyVC.message.content.content
          );
          setVC(SubsidyVC);
          setInput(SubsidyVC.message.content.content);
          setRevokeStatus(revoke);
          setVerifyResult(verifyVC && verifyVP.verifyStatus);
          setVerifyVPResult(verifyVP);
        }

        setIsLoading(() => false);
      })();
    } catch (e) {
      errorHandler(e);
    }
  }, [VCListGlobal, chain, router.query]);

  const revoke = async () => {
    try {
      setIsRevoking(() => true);
      const algod = getAlgod(chain);
      if (issuerDidAccountGlobal && vc) {
        await revokeVerifiableCredential(
          algod,
          issuerDidAccountGlobal,
          vc,
          issuerPw
        );
      }
      setIsRevoking(() => false);
      router.push('/113_subsidyVCListDone');
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        {input && !isLoading && (
          <>
            <section className={`mb-4`}>
              <div className={'w-72 mx-auto p-4 border-b text-center'}>
                <p
                  className={'text-base font-bold'}
                >{`口座実在証明書 VC${router.query.idx}`}</p>

                <div
                  className={
                    'flex flex-col items-center gap-2 mx-auto mt-2 pb-4 border-b'
                  }
                >
                  {verifyResult ? (
                    <p
                      className={
                        'relative text-xs text-color-gray-search leading-relaxed'
                      }
                    >
                      <img
                        src="/authenticated.svg"
                        className={
                          'absolute top-0 -translate-y-3 -translate-x-full'
                        }
                      />
                      検証OK
                    </p>
                  ) : (
                    <p className={'relative text-xs leading-relaxed'}>
                      <img
                        src="/warning.svg"
                        className={'absolute -translate-x-full pr-2'}
                      />
                      検証NG
                    </p>
                  )}
                  <p className={'text-xs text-color-gray-search'}>
                    {revokeStatus ? '発行済' : '取消済'}
                  </p>
                  <p className={'text-xs text-color-gray-search'}>
                    申請日{' '}
                    {dayjs(input.applicationDate).format('YY/MM/DD HH:mm')}
                  </p>
                  <p className={'text-xs text-color-gray-search'}>
                    発行日 {dayjs(input.issueDate).format('YY/MM/DD HH:mm')}
                  </p>
                </div>
              </div>
            </section>
            <SubsidyInquiry input={input} verifyResult={verifyVPResult}/>
            <div className={'relative w-70 mx-auto'}>
              {isRevoking ? (
                <span
                  className={
                    'absolute right-0 -translate-y-1/2 text-sm leading-relaxed text-yellow-500'
                  }
                >
                  VC取消中...
                </span>
              ) : null}
            </div>
            <div className="w-70 mx-auto py-0">
              <div className="pt-4 pb-2 flex justify-between">
                <button
                  onClick={() => router.push('/111_subsidyVCList')}
                  className="input-form-button-white"
                >
                  戻る
                </button>
                {revokeStatus && (
                  <button onClick={revoke} className="input-form-button-red">
                    発行取消
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        <Loading isLoading={isLoading} />
      </main>
    </>
  );
};

export default SubsidyVCListDetailMain;
