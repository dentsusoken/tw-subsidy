import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea';
import NumberArea from '../common/NumberArea';
import ApplicationListItem from '../common/ApplicationListItem';
import useTaxListMain from './useTaxListMain';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import {
  ApplicationInfo,
  ApplicationListItemParams,
} from '../common/ApplicationListItem/ApplicationListItem';
import { urls } from '@/lib/types/mockApp';

const TaxListMain = () => {
  const {
    query,
    list,
    applicationItem,
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
          {applicationItem.map((item, index) => {
            return (
              <ApplicationListItem
                item={item}
                url={{
                  pathname: urls.taxListDetail,
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

export default TaxListMain;
