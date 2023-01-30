import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '@/components/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentVCListState, residentVCRequestListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

const ResidentListMain = () => {
  const router = useRouter();

  const [listCount, setListCount] = useState(0);

  const VCRequestlistState = useRecoilValue(residentVCRequestListState);
  const VClistState = useRecoilValue(residentVCListState);
  const [listState, setListState] = useState<ResidentInputFormType[]>([]);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    try {
      const verifiedList: ResidentInputFormType[] = VClistState.map((item) => item.message.content.content);
      const requestList: ResidentInputFormType[] = VCRequestlistState.map((item) => item.message.content)
      const mergeList: ResidentInputFormType[] = verifiedList.concat(requestList)
      setListState(mergeList)
      setListCount(listState.length);
      dayjs.locale("ja")
    } catch (e) {
      errorHandler(e);
    }
  }, [listState.length, errorHandler]);

  // [id]の降順で表示
  const listForSort = [...listState];
  listForSort.sort((a, b) => b.id - a.id);

  return (
    <>
      <Header menuType={2} menuTitle={'住民票紐付申請一覧'} />
      <main className="bg-color-background">
        <div className="main-search">
          <svg className="fill-none w-5 h-6" viewBox="0 0 19 20">
            <path
              d="M8.23792 0.0247757C3.6953 0.0247757 0 3.91456 0 8.69627C0 13.478 3.6953 17.3678 8.23792 17.3678C9.6266 17.3678 10.9917 17.0209 12.145 16.352C12.2374 16.469 12.3399 16.5768 12.451 16.674L14.8047 19.1516C15.0221 19.409 15.2871 19.617 15.5835 19.7627C15.88 19.9084 16.2016 19.9888 16.5286 19.9989C16.8556 20.009 17.1812 19.9487 17.4852 19.8216C17.7893 19.6945 18.0655 19.5033 18.2968 19.2598C18.5282 19.0163 18.7098 18.7256 18.8305 18.4055C18.9513 18.0854 19.0086 17.7428 18.999 17.3985C18.9893 17.0543 18.913 16.7157 18.7746 16.4037C18.6361 16.0917 18.4386 15.8127 18.194 15.5839L15.8403 13.1063C15.7257 12.9856 15.5995 12.8777 15.4638 12.7843C16.0993 11.5703 16.4994 10.158 16.4994 8.67149C16.4994 3.88978 12.8041 0 8.26146 0L8.23792 0.0247757ZM8.23792 2.50235C11.5096 2.50235 14.1221 5.25245 14.1221 8.69627C14.1221 10.3315 13.5573 11.8428 12.5687 12.9577C12.5452 12.9825 12.5216 13.0072 12.4981 13.032C12.3869 13.1293 12.2845 13.2371 12.1921 13.3541C11.1565 14.3451 9.74428 14.915 8.21438 14.915C4.94275 14.915 2.33015 12.1649 2.33015 8.72104C2.33015 5.27722 4.94275 2.52712 8.21438 2.52712L8.23792 2.50235Z"
              fill="#6179B8"
              fillOpacity="0.65"
            />
          </svg>
          <input type="text" placeholder="検索"></input>
        </div>
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
