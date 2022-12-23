import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import Header from '@/components/Header';
import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { accountInputState } from '@/lib/states/mockApp';

const AccountInputMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(accountInputState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInputFormType>({
    defaultValues: {
      bankCode: input.bankCode,
      branchNumber: input.branchNumber,
      accountNumber: input.accountNumber,
      corporateName: input.corporateName,
      applicantName: input.applicantName,
      applicantAddress: input.applicantAddress,
    },
  });

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
      <Header menuType={1} menuTitle={'口座実在証明申請'} />
      <main className="bg-color-background">
        <div className="step">
          <ul className="step-list">
            <li className="active">入力</li>
            <li>確認</li>
            <li>完了</li>
          </ul>
        </div>
        <div className="py-0 px-[53px]">
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
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
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
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
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
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
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
              {...register('corporateName', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
              })}
            />
            <div className="input-form-label">
              申請者名
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.applicantName && '・' + errors.applicantName.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('applicantName', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
              })}
            />
            <div className="input-form-label">
              申請住所
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.applicantAddress &&
                  '・' + errors.applicantAddress.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('applicantAddress', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
              })}
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
