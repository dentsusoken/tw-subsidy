import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { subsidyListState } from '@/lib/states/mockApp/subsidyListState';
import { subsidyInputState } from '@/lib/states/mockApp/subsidyInputState';
import { SubsidyInputFormType } from '@/lib/types/mockApp/Form';
import { useState, useEffect, useMemo } from 'react';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { useRouter } from 'next/router';
import { urls } from '@/lib/types/mockApp';

const useSubsidyListMain = () => {
  const setSubsidyInput = useSetRecoilState(subsidyInputState);
  const { verifyStatusList, verifyVPList } = useVerifyHandler();
  const [query, setQuery] = useState('');
  const subsidyList = useRecoilValue(subsidyListState);
  const [list, setList] = useState<SubsidyInputFormType[]>([]);
  const [listCount, setListCount] = useState(0);
  const [filterCount, setfilterCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // [id]の降順で表示
    const listForSort = [...subsidyList];
    listForSort.sort((a, b) => b.id - a.id);
    setList(() => listForSort);
    setListCount(() => subsidyList.length);
    setfilterCount(() => subsidyList.length);
    verifyVPList(listForSort);
  }, [subsidyList]);

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
    onSubmit,
    setQuery,
    filter,
  };
};

export default useSubsidyListMain;
