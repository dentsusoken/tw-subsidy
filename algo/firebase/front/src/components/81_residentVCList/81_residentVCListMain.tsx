import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentVCListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';
import VCListItem from '../common/VCListItem';

const ResidentVCListMain = () => {
  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState("");

  const VClistState = useRecoilValue(residentVCListState);
  const [listState, setListState] = useState<ResidentInputFormType[]>([]);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      const verifiedList: ResidentInputFormType[] = VClistState.map((item) => item.message.content.content);
      setListState(verifiedList)
      setListCount(VClistState.length);
      dayjs.locale("ja")
    } catch (e) {
      errorHandler(e);
    }
  }, [VClistState.length, errorHandler]);

  // [id]の降順で表示
  const listForSort = [...listState];
  listForSort.sort((a, b) => b.id - a.id);

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
        <div className="py-3 px-0 bg-color-gray-count text-center h-[46px] font-sans">
          {listCount} 件中 - {listCount} 件を表示
        </div>
        <ul>
          {listForSort.map((item: ResidentInputFormType, index) => {
            return (
              <VCListItem key={index} name={item.fullName} revoked={true} url={{ pathname: "/82_residentVCListDetail", query: { id: item.id, idx: listForSort.length - index } }} />
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default ResidentVCListMain;
