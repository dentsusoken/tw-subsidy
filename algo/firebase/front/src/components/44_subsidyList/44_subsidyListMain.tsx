import Header from '@/components/common/Header';
import SearchArea from '@/components/common/SearchArea';
import NumberArea from '../common/NumberArea';
import useSubsidyListMain from './useSubsidyListMain';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import ApplicationListItem, {
  ApplicationInfo,
} from '../common/ApplicationListItem/ApplicationListItem';
import { urls } from '@/lib/types/mockApp';

const SubsidyListMain = () => {
  const {
    query,
    list,
    listCount,
    filterCount,
    applicationItem,
    setQuery,
    filter,
  } = useSubsidyListMain();
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
                  pathname: urls.subsidyListDetail,
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

export default SubsidyListMain;
