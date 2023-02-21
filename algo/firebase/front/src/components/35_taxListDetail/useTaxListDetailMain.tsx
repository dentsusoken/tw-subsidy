import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import { TaxInputFormType, TaxVCRequestType } from '@/lib/types/mockApp/Form';
import {
  taxInputState,
  taxVCRequestListState,
  taxVCListState,
  VCListState,
} from '@/lib/states/mockApp';
import { useEffect, useState } from 'react';

import {
  verifyVerifiableMessage,
  createVerifiableCredential,
  createVerifiableMessage,
  verifyVerifiableCredential,
} from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { holderPw, issuerPw } from '@/lib/algo/account/accounts';
import { useErrorHandler } from 'react-error-boundary';

const useTaxListDetailMain = () => {
  const [listState, setListState] = useRecoilState(taxVCRequestListState);
  const setVCList = useSetRecoilState(taxVCListState);
  const [VCList, setIssuedVCList] = useRecoilState(VCListState);
  const [isIssuing, setIsIssuing] = useState(false);
  const [vcStatus, setVCStatus] = useState({
    issuedStatus: false,
    revokeStatus: false,
  });
  const [VCRequest, setVCRequest] = useState<TaxVCRequestType>();
  const router = useRouter();
  const errorHandler = useErrorHandler();
  dayjs.locale('ja');

  const [chainType] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);

  useEffect(() => {
    (async () => {
      const algod = getAlgod(chainType);
      let issuedStatus = false;
      let revokeStatus = false;
      const select = listState.find(
        (v) => v.message.content.id === Number(router.query.id)
      );
      if (select) {
        const vc = VCList.tax.find((vc) => {
          return vc.message.content.content.id === select.message.content.id;
        });

        if (vc) {
          issuedStatus = true;
          revokeStatus = await verifyVerifiableCredential(algod, vc);
          setVCStatus(() => ({
            issuedStatus: issuedStatus,
            revokeStatus: revokeStatus,
          }));
        }
        verify(select);
        methods.setValue(
          'applicationYear',
          select.message.content.applicationYear
        );
        methods.setValue(
          'corporationName',
          select.message.content.corporationName
        );
        methods.setValue(
          'corporationAddress',
          select.message.content.corporationAddress
        );
        methods.setValue(
          'corporationAddress',
          select.message.content.corporationAddress
        );
        methods.setValue('fullName', select.message.content.fullName);
        methods.setValue('address', select.message.content.address);
      }
    })();
  }, []);

  const methods = useForm<TaxInputFormType>({
    defaultValues: {
      verifyStatus: false,
      approvalStatus: false,
      applicationDate: '',
    },
  });

  const verify = (select: TaxVCRequestType) => {
    try {
      if (select && holderDidAccountGlobal && issuerDidAccountGlobal) {
        const verified = verifyVerifiableMessage(select);
        const replaceData = {
          ...select.message.content,
          verifyStatus: verified,
        };
        const vc = createVerifiableMessage(
          holderDidAccountGlobal,
          issuerDidAccountGlobal.did,
          replaceData,
          holderPw
        );
        const updateData = listState.map((item) => {
          if (item.message.content.id === replaceData.id) {
            return vc;
          } else {
            return item;
          }
        });
        setListState(() => updateData);
        setVCRequest(() => vc);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const approve = async () => {
    try {
      if (VCRequest && holderDidAccountGlobal && issuerDidAccountGlobal) {
        setIsIssuing(true);

        if (VCRequest.message.content.verifyStatus) {
          const algod = getAlgod(chainType);
          dayjs.locale('ja');
          const now = dayjs();
          const content = VCRequest.message.content;
          const vcContent = {
            ...content,
            approvalStatus: true,
            issueDate: dayjs(now).format('YYYY-MM-DD HH:mm:ss'),
          };
          const vc = await createVerifiableCredential(
            algod,
            issuerDidAccountGlobal,
            holderDidAccountGlobal.did,
            vcContent,
            issuerPw
          );
          const updateData = listState.map((item) => {
            if (item.message.content.id === vcContent.id) {
              return createVerifiableMessage(
                holderDidAccountGlobal,
                issuerDidAccountGlobal.did,
                vcContent,
                holderPw
              );
            } else {
              return item;
            }
          });
          setListState(() => updateData);
          setVCList((items) => [...items, vc]);
          setIssuedVCList((items) => ({ ...items, tax: [...items.tax, vc] }));
          setIsIssuing(false);
          router.push({
            pathname: '/36_taxListDone',
            query: { id: router.query.id, proc: 'approve' },
          });
        }
      }
    } catch (e) {
      setIsIssuing(false);
      errorHandler(e);
    }
  };

  const reject = () => {
    router.push({
      pathname: '/36_taxListDone',
      query: { id: router.query.id, proc: 'reject' },
    });
  };

  const back = () => {
    router.push('/34_taxList', '/34_taxList');
  };

  return {
    VCRequest,
    vcStatus,
    methods,
    isIssuing,
    approve,
    back,
    verify,
    reject,
  };
};

export default useTaxListDetailMain;
