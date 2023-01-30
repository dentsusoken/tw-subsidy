import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';

export type ResidentInquiryParams = {
  input: ResidentInputFormType
}

const ResidentInquiry = ({ input }: ResidentInquiryParams) => {

  return (
    <>
      <div className="py-0 px-[53px]">
        <div className="input-form-label">氏名</div>
        <input
          type="text"
          disabled={true}
          value={input.fullName}
          className="input-form-text-box-confirm"
        />
        <div className="input-form-label">氏名フリガナ</div>
        <input
          type="text"
          disabled={true}
          value={input.fullNameFurigana}
          className="input-form-text-box-confirm"
        />
        <div className="input-form-label">住所</div>
        <input
          type="text"
          disabled={true}
          value={input.address}
          className="input-form-text-box-confirm"
        />
        <div className="input-form-label">住民となった年月</div>
        <input
          type="text"
          disabled={true}
          value={input.addressRegistDate}
          className="input-form-text-box-confirm"
        />
        <div className="input-form-label">本籍地</div>
        <input
          type="text"
          disabled={true}
          value={input.permanentAddress}
          className="input-form-text-box-confirm"
        />
      </div>
    </>
  );
};

export default ResidentInquiry;
