import { useFindHoldInfoByCenter } from 'climbingweb/src/hooks/queries/center-controller/useFindHoldInfoByCenter';
import Hold from 'climbingweb/src/interface/Hold';
import React, { useCallback, useEffect, useState } from 'react';
import { ClimbingHistories } from '../type';
import HoldImage from './HoldImage';
import HoldImageButton from './HoldImageButton';

/**
 * 홀드 선택하는 모달의 props
 * @param maxCount 제한할 홀드 최대 개수
 * @param centerId 입력받을 centerId
 * @param climbingHistories 게시물에서 이미 선택된 hold 정보
 * @param setData postData를 set 하는 함수
 */
interface ModalProps {
  maxCount: number;
  centerId?: string;
  climbingHistories: ClimbingHistories[];
  setData: any;
}

const HoldListModal = ({
  maxCount,
  centerId,
  climbingHistories,
  setData,
}: ModalProps) => {
  //기준이 되는 hold 리스트 state
  const { isLoading, isError, data, error } = useFindHoldInfoByCenter(
    centerId,
    {
      select: (response: any) =>
        response.map((val: any) => {
          return { ...val, count: 0 };
        }),
      onError: (e: any) => {
        console.log(e);
      },
    }
  );

  /**
   * ClimbingHistories 를 HoldList 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 ClimbingHistories 객체
   * @returns 변환된 HoldList
   */
  const climbingHistoriesToHold = useCallback(
    (toConvertValue: ClimbingHistories[], standardArray: Hold[]): Hold[] => {
      return toConvertValue.map((outerItem) => {
        const tempHold = standardArray.find(
          (innerItem) => innerItem.id === outerItem.holdId
        );
        return {
          id: outerItem.holdId,
          image: tempHold !== undefined ? tempHold.image : 'altImage',
          name: tempHold !== undefined ? tempHold.name : 'altName',
          count: outerItem.climbingCount,
          crayonImage:
            tempHold !== undefined ? tempHold.crayonImage : 'altCrayonImage',
        };
      });
    },
    []
  );

  /**
   * HoldList 를 ClimbingHistories 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 HoldList 객체
   * @returns 변환된 ClimbingHistories
   */
  const holdToClimbingHistories = useCallback(
    (toConvertValue: Hold[]): ClimbingHistories[] => {
      return toConvertValue.map((item) => {
        return { holdId: item.id, climbingCount: item.count };
      });
    },
    []
  );

  // 전체 count
  const [totalHoldCount, setTotalHoldCount] = useState<number>(0);
  // Modal 에서 선택된 홀드 내용, postData 에는 선택 되기 전 까진 반영되지 않음
  const [selectedHold, setSelectedHold] = useState<Hold[]>([]);

  /**
   * 선택 버튼 클릭 시, 선택된 홀드 리스트를 실제 반영하고, 변경된 홀드 리스트를 반영하는 함수
   */
  const handleModalSelectBtn = useCallback(() => {
    const totalCount = selectedHold.reduce(
      (prev, curr) => prev + curr.count,
      0
    );
    setTotalHoldCount(totalCount);
    setData(holdToClimbingHistories(selectedHold));
    setSelectedHold(selectedHold);
  }, [selectedHold, holdToClimbingHistories, setData]);

  /**
   * 다이얼로그 내 HoldImage 를 클릭 시, hold 숫자를 늘려주는 함수
   * @param indexHold 다이얼로그 내에서 선택하는 홀드의 수
   */
  const handleSelectHold = useCallback(
    (indexHold: Hold) => {
      const tempSelectedHold = selectedHold.map((item) =>
        indexHold.id === item.id ? { ...item, count: item.count + 1 } : item
      );
      // 홀드 최대 개수를 넘었는지 확인하는 로직
      if (
        tempSelectedHold.reduce((prev, curr) => prev + curr.count, 0) > maxCount
      ) {
        alert(
          `너무 많은 홀드를 선택하셨습니다. 최대 ${maxCount}개의 홀드를 선택 할 수 있습니다.`
        );
        return;
      }
      setSelectedHold(tempSelectedHold);
    },
    [selectedHold, maxCount]
  );

  /**
   * 다이얼로그 내 - 버튼 클릭 시, hold 숫자를 줄여주는 함수
   * @param indexHold 다이얼로그 내에서 선택하는 홀드의 수
   */
  const handleDeleteHold = useCallback(
    (indexHold: Hold) => {
      const tempSelectedHold = selectedHold.map((item) =>
        indexHold.id === item.id ? { ...item, count: item.count - 1 } : item
      );
      setSelectedHold(tempSelectedHold);
    },
    [selectedHold]
  );

  /**
   * onMount 시 작동할 로직이 들어가는 부분
   */
  useEffect(() => {
    const convertedHold = climbingHistoriesToHold(climbingHistories, data);
    //선택된 홀드 총 갯수 계산
    const convertedHoldCount = convertedHold.reduce(
      (prev: number, curr: Hold) => {
        return prev + curr.count;
      },
      0
    );
    setTotalHoldCount(convertedHoldCount);
    setSelectedHold(convertedHoldCount === 0 ? data : convertedHold);
  }, [data, climbingHistories, climbingHistoriesToHold, centerId]);

  return isLoading ? (
    <div>로딩 중</div>
  ) : isError ? (
    <div>`에러 : ${error}`</div>
  ) : (
    <>
      <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide">
        <label htmlFor="my-modal">
          <HoldImageButton count={totalHoldCount} maxCount={maxCount} />
        </label>
        {climbingHistoriesToHold(climbingHistories, data).map((item) =>
          item.count !== 0 ? (
            <HoldImage
              key={`HoldListModal_Hold${item.id}`}
              indexHold={item}
              count={item.count}
            />
          ) : null
        )}
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          {centerId ? (
            <div className="w-full grid grid-cols-3 gap-y-4">
              {selectedHold.map((item) => (
                <div
                  key={`HoldListModal_Hold${item.id}`}
                  className="w-full flex justify-center"
                >
                  <HoldImage
                    indexHold={item}
                    count={item.count}
                    handleSeletHold={() => handleSelectHold(item)}
                    handleDeleteHold={
                      item.count > 0 ? () => handleDeleteHold(item) : null
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>암장 정보가 정확하지 않습니다.</div>
          )}
          <label htmlFor="my-modal">
            <div
              className="relative -mb-6 -mx-6 mt-6 py-2 bg-purple-500 text-center text-white"
              onClick={() => handleModalSelectBtn()}
            >
              선택
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default HoldListModal;
