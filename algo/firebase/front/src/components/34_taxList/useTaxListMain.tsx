import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TaxInputFormType, TaxVCRequestType } from '@/lib/types/mockApp/Form';
import {
  taxInputState,
  taxInputListState,
  taxVCRequestListState,
  VCListState,
} from '@/lib/states/mockApp';

import { useState, useEffect, useMemo } from 'react';
import { urls } from '@/lib/types/mockApp';
import { useRouter } from 'next/router';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import chainState from '@/lib/states/chainState';
import { getAlgod } from '@/lib/algo/algod/algods';
import { ApplicationInfo } from '../common/ApplicationListItem/ApplicationListItem';
import { verifyVerifiableCredential } from '@/lib/algosbt';

const useTaxListMain = () => {
  const setTaxInput = useSetRecoilState(taxInputState);
  const VCRequestlistState = useRecoilValue(taxVCRequestListState);
  const [query, setQuery] = useState('');
  const taxInputList = useRecoilValue(taxInputListState);
  const [list, setList] = useState<TaxVCRequestType[]>([]);
  const [applicationItem, setApplicationItem] = useState<ApplicationInfo[]>([]);
  const [listCount, setListCount] = useState(0);
  const [filterCount, setfilterCount] = useState(0);
  const router = useRouter();
  const { verifyStatusList, verifyVCList } = useVerifyHandler();
  const VCList = useRecoilValue(VCListState);
  const chain = useRecoilValue(chainState);

  useEffect(() => {
    (async () => {
      // [id]の降順で表示
      const algod = getAlgod(chain);

      const listForSort = [...VCRequestlistState];
      listForSort.sort((a, b) => b.message.content.id - a.message.content.id);
      const items: ApplicationInfo[] = await Promise.all(
        listForSort.map(async (item, index) => {
          let issuedStatus = false;
          let revokeStatus = false;
          const vc = VCList.tax.find((vc) => {
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
      setList(() => listForSort);
      setListCount(() => VCRequestlistState.length);
      setfilterCount(() => VCRequestlistState.length);
      setApplicationItem(() => items);
    })();
  }, [VCRequestlistState]);

  const filterList = useMemo(() => {
    // let tmp = taxInputList.filter((item) => item.fullName.includes(query));
    // return tmp;
  }, [query]);

  const filter = () => {
    // setList(filterList);
    // setfilterCount(filterList.length);
  };

  const onSubmit = (item: TaxInputFormType) => {
    setTaxInput(item);
    router.push(urls.taxListDetail);
  };

  return {
    query,
    list,
    applicationItem,
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
