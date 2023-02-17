import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import {
  accountVCListState,
  accountVCRequestListState,
} from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import ApplicationListItem, {
  ApplicationInfo,
} from '../common/ApplicationListItem/ApplicationListItem';
import { AccountVCRequestType, urls } from '@/lib/types/mockApp';

const AccountListMain = () => {
  const router = useRouter();
  const { verifyVCList } = useVerifyHandler();

  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState('');
  dayjs.locale('ja');

  const VCRequestlistState = useRecoilValue(accountVCRequestListState);
  const VClistState = useRecoilValue(accountVCListState);
  const [listState, setListState] = useState<AccountVCRequestType[]>([]);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      const listForSort = [...VCRequestlistState];
      listForSort.sort((a, b) => b.message.content.id - a.message.content.id);
      setListState(listForSort);
      setListCount(listForSort.length);
      verifyVCList(listForSort);
    } catch (e) {
      errorHandler(e);
    }
  }, [VClistState, VCRequestlistState, errorHandler]);

  // [id]の降順で表示
  const listForSort = [...listState];
  listForSort.sort((a, b) => b.message.content.id - a.message.content.id);

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <SearchArea
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <div className="py-3 px-0 bg-color-gray-count text-center h-[46px] font-sans">
          {listCount} 件中 - {listCount} 件を表示
        </div>
        <ul>
          {listState.map((item, index) => {
            const ApplicationItem: ApplicationInfo = {
              id: item.message.content.id,
              applicationDate: item.message.content.applicationDate,
              approvalStatus: false,
              name: item.message.content.applicantName,
              vc: item,
            };
            if (item.message.content.approvalStatus) {
              ApplicationItem.approvalStatus = true;
            }
            return (
              <ApplicationListItem
                item={ApplicationItem}
                url={{
                  pathname: urls.accountListDetail,
                  query: { id: item.message.content.id },
                }}
                key={index}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default AccountListMain;
