import { useVerifyHandler } from '@/lib/hooks/MockApp';
import {
  AccountVCType,
  ResidentVCType,
  SubsidyInputFormType,
  SubsidyVCType,
  TaxVCType,
} from '@/lib/types/mockApp';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UrlObject } from 'url';

export type VCInfo = {
  id: number;
  name: string;
  issueDate: string | undefined;
  revoked: boolean;
  VCName: string;
  vc: ResidentVCType | AccountVCType | TaxVCType | SubsidyVCType;
  vp?: SubsidyInputFormType;
};

export type VCListItemParams = {
  item: VCInfo;
  url: string | UrlObject;
};

const VCListItem = ({ item, url }: VCListItemParams) => {
  const router = useRouter();
  const { verifyVCHandler, verifyVPHandler } = useVerifyHandler();
  const [verifyResult, setVerifyResult] = useState<boolean | undefined>(
    undefined
  );
  dayjs.locale('ja');

  useEffect(() => {
    (async () => {
      let result = verifyVCHandler(item.vc);
      if (item.vp && result) {
        const verifyVPResult = await verifyVPHandler(item.vp);
        result = verifyVPResult.verifyStatus;
      }

      setVerifyResult(result);
    })();
  });

  return (
    <>
      <li
        className={'flex w-full h-16 text-xs border-b border-color-gainsboro'}
      >
        <div
          className={
            'flex w-[390px] justify-between mx-auto px-2 gap-1 items-center'
          }
        >
          <span className={'w-fit'}>
            {dayjs(item.issueDate).format('M月D日(ddd)')}
          </span>
          <div className={`flex flex-col w-28} `}>
            <span>{item.name}</span>
            <span>{item.VCName}</span>
          </div>
          <div className={'flex w-10 h-12 items-center'}>
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
          <span className={'w-fit text-color-gray-accepted'}>
            {item.revoked ? '発行済' : '取消済'}
          </span>
          <button
            onClick={() => {
              router.push(url);
            }}
            className={
              'w-18 h-7 leading-7 border border-color-gray rounded-lg block text-base text-center font-bold'
            }
          >
            照会
          </button>
        </div>
      </li>
    </>
  );
};

export default VCListItem;
