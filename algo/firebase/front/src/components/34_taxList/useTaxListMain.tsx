import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TaxInputFormType } from '@/lib/types/mockApp/Form';
import {
  taxInputState,
  taxInputListState,
  taxVCRequestListState,
} from '@/lib/states/mockApp';

import { useState, useEffect, useMemo } from 'react';
import { urls } from '@/lib/types/mockApp';
import { useRouter } from 'next/router';
import { useVerifyHandler } from '@/lib/hooks/MockApp';

const useTaxListMain = () => {
  const setTaxInput = useSetRecoilState(taxInputState);
  const VCRequestlistState = useRecoilValue(taxVCRequestListState);
  const [query, setQuery] = useState('');
  const taxInputList = useRecoilValue(taxInputListState);
  const [list, setList] = useState<TaxInputFormType[]>([]);
  const [listCount, setListCount] = useState(0);
  const [filterCount, setfilterCount] = useState(0);
  const router = useRouter();
  const { verifyStatusList, verifyVCList } = useVerifyHandler();

  useEffect(() => {
    // [id]の降順で表示
    const listForSort = [...VCRequestlistState];
    listForSort.sort((a, b) => b.message.content.id - a.message.content.id);
    const requestList: TaxInputFormType[] = listForSort.map(
          (item) => item.message.content
        );
    setList(requestList);
    setListCount(VCRequestlistState.length);
    setfilterCount(VCRequestlistState.length);
    verifyVCList(listForSort);
  }, [VCRequestlistState]);

  const filterList = useMemo(() => {
    let tmp = taxInputList.filter((item) => item.fullName.includes(query));
    return tmp;
  }, [query]);

  const filter = () => {
    setList(filterList);
    setfilterCount(filterList.length);
  };

  const onSubmit = (item: TaxInputFormType) => {
    setTaxInput(item);
    router.push(urls.taxListDetail);
  };

  return {
    query,
    list,
    listCount,
    filterCount,
    filterList,
    setQuery,
    onSubmit,
    filter,
    verifyStatusList,
  };
};

export default useTaxListMain;
