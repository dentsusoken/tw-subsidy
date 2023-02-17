import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea';
import NumberArea from '../common/NumberArea';
import ApplicationListItem from '../common/ApplicationListItem';
import useTaxListMain from './useTaxListMain';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

const TaxListMain = () => {
  const {
    query,
    list,
    listCount,
    filterCount,
    setQuery,
    onSubmit,
    filter,
    verifyStatusList,
  } = useTaxListMain();
  dayjs.locale('ja');

  return (
    <>
      <Header />
      <main className={'mx-auto'}>
        <SearchArea
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={filter}
        />
        <NumberArea listCount={listCount} resultCount={filterCount} />
        <ul>
          {list.map((item, index) => {
            return (
              <li
                className={
                  'flex items-center w-full h-16 px-3 text-sm border-b border-color-gainsboro'
                }
                key={index}
              >
                <div className={'flex items-center mx-auto'}>
                  <span className={'pr-2'}>
                    {dayjs(item.applicationDate).format('M月D日(ddd)')}
                  </span>
                  <span className={'w-18'}>{item.fullName}</span>
                  <div className={'flex w-12 h-12 items-center'}>
                    {verifyStatusList.length > index ? (
                      verifyStatusList[index] ? (
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
                    onClick={() => onSubmit(item)}
                    className={
                      'w-18 h-7 leading-7 border border-color-gray rounded-lg block ml-auto text-base text-center font-bold'
                    }
                  >
                    照会
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default TaxListMain;
