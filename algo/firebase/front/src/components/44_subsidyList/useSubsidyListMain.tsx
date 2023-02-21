import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { useState, useEffect, useMemo } from 'react';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { useRouter } from 'next/router';
import { urls } from '@/lib/types/mockApp';
import { ApplicationInfo } from '../common/ApplicationListItem/ApplicationListItem';
import { VCListState } from '@/lib/states/mockApp';
import { verifyVerifiableCredential } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';

const useSubsidyListMain = () => {
  const setSubsidyInput = useSetRecoilState(subsidyInputState);
  const { verifyStatusList, verifyVPList } = useVerifyHandler();
  const [query, setQuery] = useState('');
  const [applicationItem, setApplicationItem] = useState<ApplicationInfo[]>([]);
  const subsidyList = useRecoilValue(subsidyListState);
  const [list, setList] = useState<SubsidyInputFormType[]>([]);
  const [listCount, setListCount] = useState(0);
  const [filterCount, setfilterCount] = useState(0);
  const router = useRouter();
  const VCList = useRecoilValue(VCListState);
  const chain = useRecoilValue(chainState);

  useEffect(() => {
    (async () => {
      // [id]の降順で表示
      const algod = getAlgod(chain);

      const listForSort = [...subsidyList];
      listForSort.sort((a, b) => b.id - a.id);
      const items: ApplicationInfo[] = await Promise.all(
        listForSort.map(async (item, index) => {
          let issuedStatus = false;
          let revokeStatus = false;
          const vc = VCList.subsidy.find((vc) => {
            return vc.message.content.content.id === item.id;
          });
          if (vc) {
            issuedStatus = true;
            revokeStatus = await verifyVerifiableCredential(algod, vc);
          }
          return {
            id: item.id,
            applicationDate: item.applicationDate,
            issuedStatus: issuedStatus,
            name: item.fullName,
            vp: item,
            revokeStatus: revokeStatus,
          };
        })
      );
      setList(() => listForSort);
      setListCount(() => subsidyList.length);
      setfilterCount(() => subsidyList.length);
      // verifyVPList(listForSort);
      setApplicationItem(() => items);
    })();
  }, [subsidyList, chain]);

  const filterList = useMemo(() => {
    let tmp = subsidyList.filter((item) => item.fullName.includes(query));
    return tmp;
  }, [query]);

  const filter = () => {
    setList(filterList);
    setfilterCount(filterList.length);
  };

  const onSubmit = (item: SubsidyInputFormType) => {
    setSubsidyInput(item);
    router.push(urls.subsidyListDetail);
  };

  return {
    query,
    list,
    filterList,
    listCount,
    filterCount,
    verifyStatusList,
    applicationItem,
    onSubmit,
    setQuery,
    filter,
  };
};

export default useSubsidyListMain;
