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
        addressRegistYear: '',
        addressRegistMonth: '',
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
          <ul className="w-[228px] mt-[70px] mx-auto mb-0">
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP1</span>
              <Link href="/11_resident-input">
                <a onClick={handleClearState} className="menu-button">
                  住民票紐付申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP2</span>
              <Link href="/21_account-input">
                <a onClick={handleClearState} className="menu-button">
                  口座実在証明申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP3</span>
              <Link href="/00_menu">
                <a onClick={handleClearState} className="menu-button">
                  納税証明書交付申請
                </a>
              </Link>
              <div className="menu-triangle"></div>
            </li>
            <li className="pt-[26px] pr-0 pb-0 pl-[42px] relative">
              <span className="menu-step">STEP4</span>
              <Link href="/00_menu">
                <a onClick={handleClearState} className="menu-button">
                  補助金申請
                </a>
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
