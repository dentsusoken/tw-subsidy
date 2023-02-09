import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';

import Header from '../common/Header';
import { accountVCListState } from '@/lib/states/mockApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import SearchArea from '../common/SearchArea';
import VCListItem from '../common/VCListItem';
import chainState from '@/lib/states/chainState';
import { VCInfo } from '../common/VCListItem/VCListItem';
import { getAlgod } from '@/lib/algo/algod/algods';
import { verifyVerifiableCredential } from '@/lib/algosbt';
import Loading from '../common/Loading';

const AccountVCListMain = () => {
  const [listCount, setListCount] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const VClistState = useRecoilValue(accountVCListState);
  const chain = useRecoilValue(chainState);
  const [listState, setListState] = useState<VCInfo[]>([]);

  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  useEffect(() => {
    (async () => {
      setIsLoading(() => true);
      const algod = getAlgod(chain);
      try {
        const verifiedList = await Promise.all(VClistState.map(async (item, index) => {
          const revokeStatus = await verifyVerifiableCredential(algod, item)
          return {
            id: item.message.content.content.id,
            name: item.message.content.content.applicantName,
            issueDate: item.message.content.content.issueDate,
            revoked: revokeStatus,
            VCName: `口座実在証明書 VC${index + 1}`
          }
        }));
        setListState(verifiedList)
        setListCount(VClistState.length);
        dayjs.locale("ja")
      } catch (e) {
        errorHandler(e);
      }
      setIsLoading(() => false);
    })();
  }, [VClistState, chain, errorHandler]);

  const sortList = (list: VCInfo[]) => {
    list.sort((a, b) => {
      if (dayjs(b.issueDate).isBefore(dayjs(a.issueDate))) {
        return -1;
      }
      else if (dayjs(b.issueDate).isAfter(dayjs(a.issueDate))) {
        return 1
      }
      else {
        return 0
      }
    });
    return list;
  }
  const listForSort = sortList(listState);

  return (
    <>
      <Header />
      <main className="bg-color-background">
        <SearchArea value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
        <div className="py-3 px-0 bg-color-gray-count text-center h-[46px] font-sans">
          {listCount} 件中 - {listCount} 件を表示
        </div>
        {!isLoading &&
          <ul>
            {listForSort.map((item, index) => {
              return (
                <VCListItem key={index} item={item} url={{ pathname: "/92_accountVCListDetail", query: { id: item.id, idx: listForSort.length - index } }} />
              );
            })}
          </ul>
        }
        <Loading isLoading={isLoading} />
      </main>
    </>
  );
};

export default AccountVCListMain;
