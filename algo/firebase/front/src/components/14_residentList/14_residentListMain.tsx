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

const ResidentListMain = () => {
  const router = useRouter();
  const { verifyStatusList, verifyVCList } = useVerifyHandler();
  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState('');
  const VCRequestlistState = useRecoilValue(residentVCRequestListState);
  const [listState, setListState] = useState<ResidentInputFormType[]>([]);

  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  useEffect(() => {
    try {
      const listForSort = [...VCRequestlistState];
      listForSort.sort((a, b) => b.message.content.id - a.message.content.id);
      const requestList: ResidentInputFormType[] = listForSort.map(
        (item) => item.message.content
      );
      setListState(requestList);
      setListCount(requestList.length);
      verifyVCList(listForSort);
    } catch (e) {
      errorHandler(e);
    }
  }, [VCRequestlistState, errorHandler]);

  // [id]の降順で表示
  const listForSort = [...listState];
  listForSort.sort((a, b) => b.id - a.id);

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
            return (
              <li
                className={
                  'flex items-center w-full h-16 px-3 text-sm border-b border-color-gainsboro'
                }
                key={index}
              >
                <div className={'flex items-center mx-auto'}>
                  <span className={'pr-2'}>
                    {dayjs(item.applicationDate).format('M月D日(ddd)')}
                  </span>
                  <span className={'w-18'}>{item.fullName}</span>
                  <div className={'flex w-12 h-12 items-center'}>
                    {verifyStatusList ? (
                      verifyStatusList[index] ? (
                        <img
                          src="./authenticated.svg"
                          alt=""
                          className="inline-block"
                        />
                      ) : (
                        <img src="./warning.svg" className={'mx-auto'} />
                      )
                    ) : null}
                  </div>
                  <span
                    className={
                      'text-center w-18 ' +
                      (item.approvalStatus
                        ? 'text-color-gray-accepted'
                        : 'text-color-warnig')
                    }
                  >
                    {item.approvalStatus ? '承認済' : '未承認'}
                  </span>
                  <button
                    onClick={() => {
                      router.push({
                        pathname: './15_resident-list-detail',
                        query: { id: item.id },
                      });
                    }}
                    className={
                      'w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold'
                    }
                  >
                    照会
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default ResidentListMain;
