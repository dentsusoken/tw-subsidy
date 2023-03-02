import { AccountInputFormType } from "@/lib/types/mockApp/inputForm";

export type AccountInquiryParams = {
    input: AccountInputFormType;
}
const AccountInquiry = ({ input }: AccountInquiryParams) => {

    return (
        <>
            <div className="py-0 px-[53px]">
                <div className="input-form-label">金融機関コード</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.bankCode}
                    className="input-form-text-box-confirm-half"
                />
                <div className="input-form-label">支店番号</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.branchNumber}
                    className="input-form-text-box-confirm-half"
                />
                <div className="input-form-label">口座番号</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.accountNumber}
                    className="input-form-text-box-confirm"
                />
                <div className="input-form-label">法人名称</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.corporateName}
                    className="input-form-text-box-confirm"
                />
                <div className="input-form-label">申請者名</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.applicantName}
                    className="input-form-text-box-confirm"
                />
                <div className="input-form-label">申請住所</div>
                <input
                    type="text"
                    disabled={true}
                    value={input.applicantAddress}
                    className="input-form-text-box-confirm"
                />
            </div>
        </>
    );
};

export default AccountInquiry;
