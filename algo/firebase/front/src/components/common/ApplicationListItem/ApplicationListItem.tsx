import useApplicationListItem, {
  useApplicationListItemParams,
} from './useApplicationListItem';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { UrlObject } from 'url';
import {
  AccountVCRequestType,
  ResidentVCRequestType,
  SubsidyInputFormType,
  TaxVCRequestType,
} from '@/lib/types/mockApp';
import { useRouter } from 'next/router';
import { useVerifyHandler } from '@/lib/hooks/MockApp';
import { useEffect, useState } from 'react';

export type ApplicationInfo = {
  id: number;
  name: string;
  applicationDate: string | undefined;
  approvalStatus: boolean;
  vc?: ResidentVCRequestType | AccountVCRequestType | TaxVCRequestType;
  vp?: SubsidyInputFormType;
};

export type ApplicationListItemParams = {
  item: ApplicationInfo;
  url: string | UrlObject;
};

const ApplicationListItem = ({ item, url }: ApplicationListItemParams) => {
  const router = useRouter();
  const { verifyVCHandler, verifyVPHandler } = useVerifyHandler();
  const [verifyResult, setVerifyResult] = useState<boolean | undefined>(
    undefined
  );
  dayjs.locale('ja');

  useEffect(() => {
    (async () => {
      if (item.vc) {
        setVerifyResult(verifyVCHandler(item.vc));
      }

      if (item.vp) {
        const result = await verifyVPHandler(item.vp);
        setVerifyResult(result.verifyStatus);
      }
    })();
  });
  dayjs.locale('ja');

  return (
    <>
      <li
        className={'flex w-full h-16 text-sm border-b border-color-gainsboro'}
      >
        <div
          className={
            'flex w-[390px] justify-between mx-auto px-2 gap-1 items-center'
          }
        >
          <span className={'pr-2'}>
            {dayjs(item.applicationDate).format('M月D日(ddd)')}
          </span>
          <span className={'w-18'}>{item.name}</span>
          <div className={'flex items-center w-12 h-12'}>
            {typeof verifyResult === 'boolean' ? (
              verifyResult ? (
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
              router.push(url);
            }}
            className={
              'w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold'
            }
          >
            照会
          </button>
        </div>
      </li>
    </>
  );
};

export default ApplicationListItem;
