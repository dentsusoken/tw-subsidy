import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { ResidentInputFormType } from '@/lib/types/mockApp/inputForm';
import { residentVCRequestListState, VCListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { ResidentVCRequestType, urls } from '@/lib/types/mockApp';
import ApplicationListItem, {
  ApplicationInfo,
} from '../common/ApplicationListItem/ApplicationListItem';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiableCredential } from '@/lib/algosbt';

const ResidentListMain = () => {
  const router = useRouter();
  const { verifyStatusList, verifyVCList } = useVerifyHandler();
  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState('');
  const [applicationItem, setApplicationItem] = useState<ApplicationInfo[]>([]);
  const VCRequestlistState = useRecoilValue(residentVCRequestListState);
  const [listState, setListState] = useState<ResidentVCRequestType[]>([]);
  const VCList = useRecoilValue(VCListState);
  const chain = useRecoilValue(chainState);

  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  useEffect(() => {
    try {
      (async () => {
        // [id]の降順で表示
        const algod = getAlgod(chain);        
  
        const listForSort = [...VCRequestlistState];
        listForSort.sort((a, b) => b.message.content.id - a.message.content.id);
        const items: ApplicationInfo[] = await Promise.all(
          listForSort.map(async (item, index) => {
            let issuedStatus = false;
            let revokeStatus = false;
            const vc = VCList.resident.find((vc) => {
              return vc.message.content.content.id === item.message.content.id;
            });
            if (vc) {
              issuedStatus = true;
              revokeStatus = await verifyVerifiableCredential(algod, vc);
            }
            return {
              id: item.message.content.id,
              applicationDate: item.message.content.applicationDate,
              issuedStatus: issuedStatus,
              name: item.message.content.fullName,
              vc: item,
              revokeStatus: revokeStatus,
            };
          })
        );        
        setListState(listForSort);
        setListCount(listForSort.length);
        verifyVCList(listForSort);
        setApplicationItem(() => items);
      })();

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
          {applicationItem.map((item, index) => {
            return (
              <ApplicationListItem
                item={item}
                url={{
                  pathname: urls.residentListDetail,
                  query: { id: item.id },
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
