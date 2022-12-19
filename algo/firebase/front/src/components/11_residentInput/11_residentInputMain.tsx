import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import Header from '@/components/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentInputState } from '@/lib/states/mockApp';

const ResidentInputMain = () => {
  const router = useRouter();

  const [input, setInput] = useRecoilState(residentInputState);

  const { register, handleSubmit } = useForm<ResidentInputFormType>({
    defaultValues: {
      fullName: input.fullName,
      fullNameFurigana: input.fullNameFurigana,
      address: input.address,
      addressRegistDate: input.addressRegistDate,
      permanentAddress: input.permanentAddress,
    },
  });

  const onSubmit = handleSubmit((data: ResidentInputFormType) => {
    setInput(() => ({
      ...{
        id: 0,
        fullName: data.fullName,
        fullNameFurigana: data.fullNameFurigana,
        address: data.address,
        addressRegistDate: data.addressRegistDate,
        permanentAddress: data.permanentAddress,
      },
    }));

    router.push('/12_resident-confirm');
  });

  return (
    <>
      <Header menuType={1} menuTitle={'住民票紐付申請'} />
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
              氏名<span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('fullName', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              氏名フリガナ
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('fullNameFurigana', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              住所<span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('address', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              住民となった年月
              <span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('addressRegistDate', { required: '必須項目です' })}
            />
            <div className="input-form-label">
              本籍地<span className="input-form-label-required">（必須）</span>
            </div>
            <input
              type="text"
              className="input-form-text-box"
              {...register('permanentAddress', { required: '必須項目です' })}
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
