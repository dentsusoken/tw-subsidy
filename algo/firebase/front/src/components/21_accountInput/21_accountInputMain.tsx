import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { AccountInputFormType, ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { accountInputState, VCListState } from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';
import Progress from '../common/Progress';

const AccountInputMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(accountInputState);

  const VCListGlobal = useRecoilValue(VCListState);
  const [residentVC, setResidentVC] = useState<ResidentInputFormType>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountInputFormType>({
    defaultValues: {
      bankCode: input.bankCode,
      branchNumber: input.branchNumber,
      accountNumber: input.accountNumber,
      corporateName: input.corporateName,
      applicantName: residentVC?.fullName,
      applicantAddress: residentVC?.address,
    },
  });

  useEffect(() => {
    if (VCListGlobal && VCListGlobal.resident.length > 0) {
      setResidentVC(VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content);
      setValue("applicantName", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.fullName);
      setValue("applicantAddress", VCListGlobal.resident[VCListGlobal.resident.length - 1].message.content.content.address);
    }
  }, [VCListGlobal, setValue])



  const onSubmit = handleSubmit((data: AccountInputFormType) => {
    setInput(() => ({
      ...{
        id: 0,
        bankCode: data.bankCode,
        branchNumber: data.branchNumber,
        accountNumber: data.accountNumber,
        corporateName: data.corporateName,
        applicantName: data.applicantName,
        applicantAddress: data.applicantAddress,
      },
    }));

    router.push('/22_account-confirm');
  });

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Progress status='input' />
        {
          !residentVC
            ? <div className={"relative w-full text-center"}><span className={"absolute w-full left-0 -top-8 text-sm text-color-warnig"}>住民票紐付申請を実施してください。</span></div>
            : null
        }
        <div className="mt-[9px] py-0 px-[53px]">
          <form onSubmit={onSubmit}>
            <div className="input-form-label">
              銀行コード
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.bankCode && '・' + errors.bankCode.message}
              </span>
            </div>
            <input
              type="text"
              maxLength={4}
              className="input-form-text-box-half"
              {...register('bankCode', {
                pattern: {
                  value: /\d{4}/,
                  message: '半角数字で4桁です',
                },
              })}
            />
            <div className="input-form-label">
              支店番号
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.branchNumber && '・' + errors.branchNumber.message}
              </span>
            </div>
            <input
              type="text"
              maxLength={3}
              className="input-form-text-box-half"
              {...register('branchNumber', {
                pattern: {
                  value: /\d{3}/,
                  message: '半角数字で3桁です',
                },
              })}
            />
            <div className="input-form-label">
              口座番号
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.accountNumber && '・' + errors.accountNumber.message}
              </span>
            </div>
            <input
              type="text"
              maxLength={8}
              className="input-form-text-box-half"
              {...register('accountNumber', {
                pattern: {
                  value: /\d{7}|\d{8}/,
                  message: '半角数字で7桁または8桁です',
                },
              })}
            />
            <div className="input-form-label">
              法人名称
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.corporateName && '・' + errors.corporateName.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('corporateName')}
            />
            <div className="input-form-label">
              申請者名
            </div>
            <input
              type="text"
              className={`${!!residentVC ? "input-form-text-box-confirm" : "input-form-text-box"}`}
              {...register('applicantName')}
              disabled={!!residentVC}
            />
            <div className="input-form-label">
              申請住所
            </div>
            <input
              type="text"
              className={`${!!residentVC ? "input-form-text-box-confirm" : "input-form-text-box"}`}
              {...register('applicantAddress')}
              disabled={!!residentVC}
            />
            <div className="pt-4 text-right">
              <button type="submit" className="input-form-button-green">
                確認
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AccountInputMain;
