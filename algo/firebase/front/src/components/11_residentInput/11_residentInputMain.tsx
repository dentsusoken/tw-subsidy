import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { years, months } from '@/lib/types/mockApp/setDate';
import { residentInputState } from '@/lib/states/mockApp';
import Progress from '../common/Progress';

const ResidentInputMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(residentInputState);

  const [addressRegistYear, setAddressRegistYear] = useState(
    input.addressRegistYear
  );
  const [addressRegistMonth, setAddressRegistMonth] = useState(
    input.addressRegistMonth
  );

  const selectAddressRegistYear = (e: any) => {
    setAddressRegistYear(e.target.value);
  };

  const selectAddressRegistMonth = (e: any) => {
    setAddressRegistMonth(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResidentInputFormType>({
    defaultValues: {
      fullName: input.fullName,
      fullNameFurigana: input.fullNameFurigana,
      address: input.address,
      addressRegistDate: input.addressRegistDate,
      addressRegistYear: input.addressRegistYear,
      addressRegistMonth: input.addressRegistMonth,
      permanentAddress: input.permanentAddress,
    },
  });

  const onSubmit = handleSubmit((data: ResidentInputFormType) => {
    const year = addressRegistYear
      ? addressRegistYear
      : new Date().getFullYear().toString() + '年';
    const monnth = addressRegistMonth ? addressRegistMonth : '1月';

    setInput(() => ({
      ...{
        id: 0,
        fullName: data.fullName,
        fullNameFurigana: data.fullNameFurigana,
        address: data.address,
        addressRegistDate: year + monnth,
        addressRegistYear: year,
        addressRegistMonth: monnth,
        permanentAddress: data.permanentAddress,
      },
    }));

    router.push('/12_resident-confirm');
  });

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <Progress status='input'/>
        <div className="mt-[9px] py-0 px-[53px]">
          <form onSubmit={onSubmit}>
            <div className="input-form-label">
              氏名<span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.fullName && '・' + errors.fullName.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('fullName', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
              })}
            />
            <div className="input-form-label">
              氏名フリガナ
              <span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.fullNameFurigana &&
                  '・' + errors.fullNameFurigana.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('fullNameFurigana', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
                pattern: {
                  value: /^[ァ-ヴー　]*$/,
                  message: '全角カナで入力してください',
                },
              })}
            />
            <div className="input-form-label">
              住所<span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.address && '・' + errors.address.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('address', {
                required: {
                  value: true,
                  message: '入力必須項目です',
                },
              })}
            />
            <div className="input-form-label">
              住民となった年月
              <span className="input-form-label-required">（必須）</span>
            </div>
            <select
              value={addressRegistYear}
              className="input-form-select-year"
              onChange={selectAddressRegistYear}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={addressRegistMonth}
              className="input-form-select-month"
              onChange={selectAddressRegistMonth}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <div className="input-form-label">
              本籍地<span className="input-form-label-required">（必須）</span>
              <span className="text-error-message text-color-required">
                {errors.permanentAddress &&
                  '・' + errors.permanentAddress.message}
              </span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('permanentAddress', {
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

export default ResidentInputMain;
