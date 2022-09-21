import Hold from 'climbingweb/src/interface/Hold';
import React, { useCallback, useEffect, useState } from 'react';
import { ClimbingHistories } from '../type';
import HoldImage from './HoldImage';
import HoldImageButton from './HoldImageButton';

/**
 * 홀드 선택하는 모달의 props
 * @param maxCount 제한할 홀드 최대 개수
 * @param indexHoldList 모달이 팝업 되기 전 페이지에 반영된 홀드 리스트, 이를 통해 모달이 팝업 될 때 홀드의 종류 및 각 개수를 띄워준다.
 * @param selectHoldList 모달이 팝업 된 후 홀드 리스트 상태, 변경 될 수 있다.
 */
interface ModalProps {
  maxCount: number;
  indexHoldList: Hold[];
  climbingHistories: ClimbingHistories[];
  setData: any;
}

const HoldListModal = ({
  maxCount,
  indexHoldList,
  climbingHistories,
  setData,
}: ModalProps) => {
  /**
   * ClimbingHistories 를 HoldList 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 ClimbingHistories 객체
   * @returns 변환된 HoldList
   */
  const climbingHistoriesToHold = (
    toConvertValue: ClimbingHistories[]
  ): Hold[] => {
    return toConvertValue
      ? toConvertValue.map((outerItem) => {
          const tempHold = indexHoldList.find(
            (innerItem) => innerItem.id === outerItem.holdId
          );
          return {
            id: outerItem.holdId,
            image: tempHold !== undefined ? tempHold.image : 'altImage',
            name: tempHold !== undefined ? tempHold.name : 'altName',
            count: outerItem.climbingCount,
          };
        })
      : indexHoldList;
  };

  /**
   * HoldList 를 ClimbingHistories 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 HoldList 객체
   * @returns 변환된 ClimbingHistories
   */
  const holdToClimbingHistories = useCallback(
    (toConvertValue: Hold[]): ClimbingHistories[] => {
      return toConvertValue
        ? toConvertValue.map((item) => {
            return { holdId: item.id, climbingCount: item.count };
          })
        : climbingHistories;
    },
    [climbingHistories]
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
    setTotalHoldCount(0);
    setSelectedHold(indexHoldList);
  }, [indexHoldList]);
  return (
    <>
      <label htmlFor="my-modal">
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide">
          <HoldImageButton count={totalHoldCount} maxCount={maxCount} />
          {climbingHistoriesToHold(climbingHistories).map((item) =>
            item.count !== 0 ? (
              <HoldImage
                key={`HoldListModal_Hold${item.id}`}
                indexHold={item}
                count={item.count}
              />
            ) : null
          )}
        </div>
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex">
            {selectedHold.map((item) => (
              <HoldImage
                key={`HoldListModal_Hold${item.id}`}
                indexHold={item}
                count={item.count}
                handleSeletHold={() => handleSelectHold(item)}
                handleDeleteHold={
                  item.count > 0 ? () => handleDeleteHold(item) : null
                }
              />
            ))}
          </div>

          <label htmlFor="my-modal">
            <div
              className="relative -mb-6 -mx-6 py-2 bg-purple-500 text-center text-white"
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
