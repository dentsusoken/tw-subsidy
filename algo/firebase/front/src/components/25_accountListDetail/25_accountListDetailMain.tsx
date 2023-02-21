import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import Header from '../common/Header';
import {
  accountVCListState,
  accountVCRequestListState,
  VCListState,
} from '@/lib/states/mockApp';
import {
  verifyVerifiableMessage,
  createVerifiableCredential,
  createVerifiableMessage,
  verifyVerifiableCredential,
} from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { holderPw, issuerPw } from '@/lib/algo/account/accounts';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { AccountInquiry } from '../common/Forms';
import Container from '../common/Container';
import { AccountVCRequestType } from '@/lib/types/mockApp';
import Loading from '../common/Loading';

const AccountListDetailMain = () => {
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const [vcStatus, setVCStatus] = useState({
    issuedStatus: false,
    revokeStatus: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [listState, setListState] = useRecoilState(accountVCRequestListState);
  const setVCList = useSetRecoilState(accountVCListState);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectDetail, SetSelectDetail] = useState<AccountVCRequestType>();
  const [VCList, setIssuedVCList] = useRecoilState(VCListState);

  const [chainType] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);
  const [chain] = useRecoilState(chainState);
  dayjs.locale('ja');

  useEffect(() => {
    (async () => {
      setIsLoading(() => true);
      const algod = getAlgod(chain);
      let issuedStatus = false;
      let revokeStatus = true;
      const select = listState.find(
        (v) => v.message.content.id === Number(router.query.id)
      );
      if (select) {
        const vc = VCList.account.find((vc) => {
          return vc.message.content.content.id === select.message.content.id;
        });

        if (vc) {
          issuedStatus = true;
          revokeStatus = await verifyVerifiableCredential(algod, vc);
          setVCStatus(() => ({
            issuedStatus: issuedStatus,
            revokeStatus: revokeStatus,
          }));
        }
        verify(select);
      }
      setIsLoading(() => false);
    })();
  }, [router.query]);

  const verify = (select: AccountVCRequestType) => {
    try {
      if (select && holderDidAccountGlobal && issuerDidAccountGlobal) {
        const verified = verifyVerifiableMessage(select);
        const replaceData = {
          ...select.message.content,
          verifyStatus: verified,
        };
        const vc = createVerifiableMessage(
          holderDidAccountGlobal,
          issuerDidAccountGlobal.did,
          replaceData,
          holderPw
        );
        const updateData = listState.map((item) => {
          if (item.message.content.id === replaceData.id) {
            return vc;
          } else {
            return item;
          }
        });
        setListState(() => updateData);
        SetSelectDetail(() => vc);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const approve = async () => {
    try {
      if (selectDetail && holderDidAccountGlobal && issuerDidAccountGlobal) {
        setIsIssuing(true);

        if (selectDetail.message.content.verifyStatus) {
          const algod = getAlgod(chainType);
          const now = dayjs();
          const content = selectDetail.message.content;
          const vcContent = {
            ...content,
            approvalStatus: true,
            issueDate: dayjs(now).format('YYYY-MM-DD HH:mm:ss'),
          };
          const vc = await createVerifiableCredential(
            algod,
            issuerDidAccountGlobal,
            holderDidAccountGlobal.did,
            vcContent,
            issuerPw
          );
          const updateData = listState.map((item) => {
            if (item.message.content.id === vcContent.id) {
              return createVerifiableMessage(
                holderDidAccountGlobal,
                issuerDidAccountGlobal.did,
                vcContent,
                holderPw
              );
            } else {
              return item;
            }
          });
          setListState(() => updateData);
          setVCList((items) => [...items, vc]);
          setIssuedVCList((items) => ({
            ...items,
            account: [...items.account, vc],
          }));
          setIsIssuing(false);
          router.push({
            pathname: '/26_account-list-done',
            query: { id: router.query.id, proc: 'approve' },
          });
        }
      }
    } catch (e) {
      setIsIssuing(false);
      errorHandler(e);
    }
  };

  const reject = () => {
    router.push({
      pathname: '/26_account-list-done',
      query: { id: router.query.id, proc: 'reject' },
    });
  };

  return (
    <>
      <Header />
      <main className="bg-color-background">
        {!isLoading && (
          <>
            {selectDetail && (
              <section
                className={
                  'flex flex-col items-center gap-1 w-72 mx-auto mb-2 pb-4 border-b'
                }
              >
                {selectDetail.message.content.verifyStatus && vcStatus.revokeStatus ? (
                  <p
                    className={
                      'relative text-sm text-color-gray-search leading-relaxed'
                    }
                  >
                    <img
                      src="/authenticated.svg"
                      className={
                        'absolute top-0 h-11 -translate-y-3 -translate-x-full'
                      }
                    />
                    検証OK
                  </p>
                ) : (
                  <p className={'relative text-sm leading-relaxed'}>
                    <img
                      src="/warning.svg"
                      className={'absolute -translate-x-full pr-2'}
                    />
                    検証NG
                  </p>
                )}
                {vcStatus.issuedStatus ? (
                  vcStatus.revokeStatus ? (
                    <p
                      className={
                        'relative text-sm text-color-gray-search leading-relaxed'
                      }
                    >
                      <img
                        src="/authenticated.svg"
                        className={
                          'absolute top-0 h-11 -translate-y-3 -translate-x-full'
                        }
                      />
                      承認済
                    </p>
                  ) : (
                    <p
                      className={
                        'text-sm text-color-gray-search leading-relaxed'
                      }
                    >
                      取消済
                    </p>
                  )
                ) : (
                  <p className={'text-sm text-color-required leading-relaxed'}>
                    未承認
                  </p>
                )}
                <p className={'text-xs text-color-gray-search leading-relaxed'}>
                  申請日
                  {dayjs(selectDetail.message.content.applicationDate).format(
                    'YY/MM/DD HH:mm'
                  )}
                </p>
              </section>
            )}
            <div className="py-0 px-[53px]">
              {selectDetail && (
                <AccountInquiry input={selectDetail.message.content} />
              )}
              <div className={'w-70 mx-auto relative'}>
                {isIssuing ? (
                  <span
                    className={
                      'absolute right-0 -translate-y-1/2 text-sm leading-relaxed text-yellow-500'
                    }
                  >
                    VC発行中...
                  </span>
                ) : null}
              </div>
              <div className="w-70 mx-auto pt-4 pb-2 flex justify-between">
                <button
                  onClick={() => router.push('/24_account-list')}
                  className="input-form-button-white"
                >
                  戻る
                </button>
                {selectDetail &&
                !selectDetail.message.content.approvalStatus ? (
                  selectDetail.message.content.verifyStatus ? (
                    <button
                      onClick={approve}
                      className="input-form-button-blue"
                    >
                      承認
                    </button>
                  ) : (
                    <button
                      onClick={reject}
                      className="input-form-button-white"
                    >
                      却下
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </>
        )}
      </main>
      <Loading isLoading={isLoading} />
    </>
  );
};

export default AccountListDetailMain;
