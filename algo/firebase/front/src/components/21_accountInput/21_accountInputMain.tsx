import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import Header from '@/components/Header';
import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { accountInputState } from '@/lib/states/mockApp';

const AccountInputMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(accountInputState);

  const { register, handleSubmit } = useForm<AccountInputFormType>({
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
            </div>
            <input
              type="text"
              className="input-form-text-box-half"
              {...register('bankCode', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              支店番号
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box-half"
              {...register('branchNumber', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              口座番号
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('accountNumber', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              法人名称
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('corporateName', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              申請者名
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('applicantName', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              申請住所
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('applicantAddress', { required: '必須項目です' })}
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
