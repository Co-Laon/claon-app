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
  //queryKey에는 null이 못들어가서 임시방편으로 string null로 대체
  const [centerId, setCenterId] = useState('null');
  //center List call
  const {
    data: centersData,
    isError: isCentersDataError,
    fetchNextPage: fetchNextCenters,
    error: centerDataError,
    isFetchingNextPage: isFetchingCenters,
    hasNextPage: hasNextCenters,
  } = useCenterByUser(nickName);

  //center 별 history call
  const { data: historyData } = useHistoryByCenter(nickName, centerId);

  //intersect handler
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextCenters) {
        fetchNextCenters();
      }
    },
    { threshold: 1 }
  );

  //center click handler
  const onClickCenter = useCallback((id: string) => {
    setCenterId(id);
  }, []);

  if (isCentersDataError) return <ErrorContent error={centerDataError} />;

  return (
    <div className="pt-5 mb-footer overflow-auto scrollbar-hide pl-3 pr-2 pb-2">
      <div className="flex flex-row overflow-auto gap-3 scrollbar-hide">
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
      <div className="gap-4 pt-6 flex flex-col">
        {historyData?.map((history, index) => (
          <div key={`hisotryData_${index}`}>
            <p className="text-xs leading-[18px] font-medium">{history.date}</p>
            <div className="flex flex-col gap-3 pt-1">
              {history.histories.map((h, idx) => (
                <HoldsByDate key={`holdsByDate_${idx}`} {...h} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HistoryByCenter;
