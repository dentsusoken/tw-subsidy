import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentVCListState, residentVCRequestListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';

const ResidentListMain = () => {
  const router = useRouter();

  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState("");
  const VCRequestlistState = useRecoilValue(residentVCRequestListState);
  const VClistState = useRecoilValue(residentVCListState);
  const [listState, setListState] = useState<ResidentInputFormType[]>([]);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      const requestList: ResidentInputFormType[] = VCRequestlistState.map((item) => item.message.content)
      setListState(requestList)
      setListCount(requestList.length);
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
        <table className="searce-list">
          <tbody className="font-sans">
            {listForSort.map((items: ResidentInputFormType) => {
              return (
                <tr key={items.id}>
                  <td>{dayjs(items.applicationDate).format("M月D日(ddd)")}</td>
                  <td>{items.fullName}</td>
                  <td>
                    {items.verifyStatus && (
                      <svg className="fill-none w-13 h-12" viewBox="0 0 48 47">
                        <path
                          d="M24.3685 13.4056C25.8588 11.1412 29.3898 12.218 29.3554 14.9263C29.3352 16.5216 30.6986 17.7878 32.2893 17.6457L32.5925 17.6186C35.2249 17.3835 36.4927 20.7587 34.3626 22.3238C33.0727 23.2716 32.9318 25.1465 34.0678 26.2711C35.9507 28.1353 34.1628 31.2935 31.592 30.6446L31.461 30.6115C29.9135 30.2209 28.3732 31.2859 28.1866 32.8705C27.8747 35.518 24.2897 36.1292 23.1423 33.7244L23.0369 33.5034C22.3481 32.0599 20.5689 31.5173 19.1884 32.3298L18.977 32.4542C16.6772 33.8078 14.0481 31.3016 15.2743 28.9329C16.0082 27.5153 15.3286 25.7733 13.8266 25.234L13.6996 25.1884C11.2044 24.2925 11.4934 20.6772 14.0998 20.182C15.6722 19.8833 16.6069 18.2504 16.0691 16.7453C15.181 14.2598 18.1248 12.1689 20.1751 13.832L20.4114 14.0236C21.6503 15.0285 23.4906 14.7394 24.3685 13.4056Z"
                          fill="#3EE76E"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M29.6942 19.544C30.1284 19.9771 30.1284 20.6791 29.6942 21.1121L22.2369 28.549L18.1152 24.4385C17.681 24.0055 17.681 23.3035 18.1152 22.8705C18.5494 22.4374 19.2534 22.4374 19.6876 22.8705L22.2369 25.4128L28.1218 19.544C28.556 19.111 29.26 19.111 29.6942 19.544Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    )}
                  </td>
                  {!items.approvalStatus ? (
                    <td className="text-color-unapproved">未承認</td>
                  ) : (
                    <td className="text-color-gray-search">承認済</td>
                  )}
                  <td>
                    <button
                      onClick={() => {
                        router.push({
                          pathname: '/15_resident-list-detail',
                          query: { id: items.id },
                        });
                      }}
                      className="input-form-button-small"
                    >
                      照会
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default ResidentListMain;
