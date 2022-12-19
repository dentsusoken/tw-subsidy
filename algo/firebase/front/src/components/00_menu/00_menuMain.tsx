import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

import Header from '@/components/Header';
import {
  residentInputState,
  residentListState,
  accountInputState,
  accountListState,
} from '@/lib/states/mockApp';

const MenuMain = () => {
  const clearResidentInputState = useSetRecoilState(residentInputState);
  const clearResidentListState = useSetRecoilState(residentListState);
  const clearAccountInputState = useSetRecoilState(accountInputState);
  const clearAccountListState = useSetRecoilState(accountListState);

  const handleClearState = () => {
    clearResidentInputState(() => ({
      ...{
        id: 0,
        fullName: '',
        fullNameFurigana: '',
        address: '',
        addressRegistDate: '',
        permanentAddress: '',
        applicationDate: undefined,
        verifyStatus: undefined,
        approvalStatus: undefined,
      },
    }));

    clearAccountInputState(() => ({
      ...{
        id: 0,
        bankCode: '',
        branchNumber: '',
        accountNumber: '',
        corporateName: '',
        applicantName: '',
        applicantAddress: '',
        applicationDate: undefined,
        verifyStatus: undefined,
        approvalStatus: undefined,
      },
    }));
  };

  const onClear = () => {
    clearResidentListState(() => {
      return [];
    });

    clearAccountListState(() => {
      return [];
    });
  };

  return (
    <>
      <Header menuType={0} menuTitle={'DEMO MENU'} />
      <main className="bg-color-background">
        <ul className="py-0 px-[53px]">
          <ul className="demomenu-step-list numbering">
            <li>
              <Link href="/11_resident-input">
                <a onClick={handleClearState}>住民票紐付申請</a>
              </Link>
            </li>
            <li>
              <Link href="/21_account-input">
                <a onClick={handleClearState}>口座実在証明申請</a>
              </Link>
            </li>
            <li>
              <Link href="/simple-demo">
                <a onClick={handleClearState}>納税証明書交付申請</a>
              </Link>
            </li>
            <li>
              <Link href="/simple-demo">
                <a onClick={handleClearState}>補助金申請</a>
              </Link>
            </li>
          </ul>
        </ul>
        <div className="pt-32 pl-4 pb-4 flex justify-between">
          <button onClick={onClear} className="input-form-button-small">
            データクリア
          </button>
        </div>
      </main>
    </>
  );
};

export default MenuMain;
