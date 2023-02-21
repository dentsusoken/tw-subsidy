import { FormProvider } from 'react-hook-form';

import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import InputArea from '@/components/common/InputArea';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import useTaxListDetailMain from './useTaxListDetailMain';
import dayjs from 'dayjs';

const TaxListDetailMain = () => {
  const {
    VCRequest,
    vcStatus,
    methods,
    isIssuing,
    approve,
    back,
    verify,
    reject,
  } = useTaxListDetailMain();
  dayjs.locale('ja');

  return (
    <>
      <Header />
      <main>
        <FormProvider {...methods}>
          {VCRequest && (
            <section
              className={
                'flex flex-col items-center gap-1 w-72 mx-auto mb-2 pb-4 border-b'
              }
            >
              {VCRequest.message.content.verifyStatus ? (
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
                    className={'text-sm text-color-gray-search leading-relaxed'}
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
                {dayjs(VCRequest.message.content.applicationDate).format(
                  'YY/MM/DD HH:mm'
                )}
              </p>
            </section>
          )}
          <Container>
            <InputArea<TaxInputFormType>
              label={'申請年度'}
              name={'applicationYear'}
              isEnabled={false}
            />
            <InputArea<TaxInputFormType>
              label={'法人名称'}
              name={'corporationName'}
              isEnabled={false}
            />
            <InputArea<TaxInputFormType>
              label={'所在地'}
              name={'corporationAddress'}
              isEnabled={false}
            />
            <InputArea<TaxInputFormType>
              label="申請者名"
              name="fullName"
              placeholder=""
              isEnabled={false}
            />
            <InputArea<TaxInputFormType>
              label="申請者住所"
              name="address"
              placeholder=""
              isEnabled={false}
            />
          </Container>
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
            <button onClick={back} className="input-form-button-white">
              戻る
            </button>
            {VCRequest && !VCRequest.message.content.approvalStatus ? (
              VCRequest.message.content.verifyStatus ? (
                <button onClick={approve} className="input-form-button-blue">
                  承認
                </button>
              ) : (
                <button onClick={reject} className="input-form-button-white">
                  却下
                </button>
              )
            ) : null}
          </div>
        </FormProvider>
      </main>
    </>
  );
};

export default TaxListDetailMain;
