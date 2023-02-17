import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentVCRequestListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { ResidentVCRequestType, urls } from '@/lib/types/mockApp';
import ApplicationListItem, {
  ApplicationInfo,
} from '../common/ApplicationListItem/ApplicationListItem';

const ResidentListMain = () => {
  const router = useRouter();
  const { verifyStatusList, verifyVCList } = useVerifyHandler();
  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState('');
  const VCRequestlistState = useRecoilValue(residentVCRequestListState);
  const [listState, setListState] = useState<ResidentVCRequestType[]>([]);

  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

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
  }, [VCRequestlistState, errorHandler]);

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
              name: item.message.content.fullName,
              vc: item,
            };
            if (item.message.content.approvalStatus) {
              ApplicationItem.approvalStatus = true
            }
            return (
              <ApplicationListItem
                item={ApplicationItem}
                url={{
                  pathname: urls.residentListDetail,
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

export default ResidentListMain;
