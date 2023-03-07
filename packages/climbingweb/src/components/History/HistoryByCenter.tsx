import {
  useCenterByUser,
  useHistoryByCenter,
} from 'climbingweb/src/hooks/queries/user/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useCallback, useState } from 'react';
import ErrorContent from '../common/Error/ErrorContent';
import Loading from '../common/Loading/Loading';
import CenterList from './CenterList';
import HoldsByDate from './HoldsByDate';

function HistoryByCenter({ nickName }: { nickName: string }) {
  const [centerId, setCenterId] = useState('null');
  const {
    data: centersData,
    isError: isCentersDataError,
    fetchNextPage: fetchNextCenters,
    error: centerDataError,
    isFetchingNextPage: isFetchingCenters,
    hasNextPage: hasNextCenters,
  } = useCenterByUser(nickName);

  const { data: historyData } = useHistoryByCenter(nickName, centerId);

  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextCenters) {
        fetchNextCenters();
      }
    },
    { threshold: 1 }
  );

  const onClickCenter = useCallback((id: string) => {
    setCenterId(id);
  }, []);

  if (isCentersDataError) return <ErrorContent error={centerDataError} />;

  return (
    <div>
      <div className="flex flex-row overflow-auto gap-3">
        {centersData?.pages.map((page) => {
          return page.results.map((result, index) => (
            <CenterList
              key={`centerList_${index}`}
              centerId={result.centerId}
              centerName={result.centerName}
              centerThumbnailUrl={result.centerThumbnailUrl}
              onClick={onClickCenter}
              focused={result.centerId == centerId}
            />
          ));
        })}
        {!isFetchingCenters ? <div ref={target} /> : <Loading />}
      </div>
      {historyData?.map((history, index) => (
        <div key={`hisotryData_${index}`}>
          <p>{history.date}</p>
          {history.histories.map((h, idx) => (
            <HoldsByDate key={`holdsByDate_${idx}`} {...h} />
          ))}
        </div>
      ))}
    </div>
  );
}
export default HistoryByCenter;
