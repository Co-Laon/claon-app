import { useToast } from 'climbingweb/src/hooks/useToast';
import Hold from 'climbingweb/src/interface/Hold';
import { ClimbingHistoryRequest } from 'climbingweb/types/request/post';
import { HoldInfoResponse } from 'climbingweb/types/response/center';
import React, { memo, useCallback, useEffect, useState } from 'react';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import HoldImage from './HoldImage';
import HoldImageButton from './HoldImageButton';

/**
 * 홀드 선택하는 모달의 props
 * @param maxCount 제한할 홀드 최대 개수
 * @param centerId 입력받을 centerId
 * @param preSelectedHoldList 게시물에서 이미 선택된 hold 정보
 * @param setData postData를 set 하는 함수
 */
interface ModalProps {
  maxCount: number;
  centerId?: string;
  standardHoldList?: HoldInfoResponse[];
  preSelectedHoldList?: ClimbingHistoryRequest[];
  setData: any;
}

const HoldListModal = ({
  maxCount,
  centerId,
  standardHoldList,
  preSelectedHoldList,
  setData,
}: ModalProps) => {
  const { toast } = useToast();

  /**
   * ClimbingHistoryRequest(postData 에 들어갈 변수) 를 HoldList(modal 보여주기 위한 변수) 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 ClimbingHistories 객체
   * @returns 변환된 HoldList
   */
  const climbingHistoriesToHold = useCallback(
    (toConvertValue: ClimbingHistoryRequest[]): Hold[] => {
      return (
        standardHoldList?.map((item) => {
          const tempHold = toConvertValue.find(
            (innerItem) => innerItem.holdId === item.id
          );
          return {
            id: item.id,
            image: item.image,
            name: item.name,
            count: tempHold !== undefined ? tempHold.climbingCount : 0,
            crayonImage: item.crayonImage,
          };
        }) ?? []
      );
    },
    [standardHoldList]
  );

  /**
   * HoldList 를 ClimbingHistories 로 변환해주는 함수
   * @param toConvertValue 변환하고 싶은 HoldList 객체
   * @returns 변환된 ClimbingHistories
   */
  const holdToClimbingHistories = useCallback(
    (toConvertValue: Hold[]): ClimbingHistoryRequest[] => {
      return toConvertValue.map((item) => {
        return { holdId: item.id, climbingCount: item.count };
      });
    },
    []
  );

  const getHoldTotalCount = useCallback((holdList: Hold[]) => {
    return holdList.reduce((prev, curr) => prev + curr.count, 0);
  }, []);

  // 전체 count
  const [totalHoldCount, setTotalHoldCount] = useState<number>(0);
  // Modal 에서 선택된 홀드 내용, postData 에는 선택 되기 전 까진 반영되지 않음
  const [selectedHoldList, setSelectedHoldList] = useState<Hold[]>(
    climbingHistoriesToHold(preSelectedHoldList ?? [])
  );

  /**
   * 선택 버튼 클릭 시, 선택된 홀드 리스트를 실제 반영하고, 변경된 홀드 리스트를 반영하는 함수
   */
  const handleModalSelectBtn = useCallback(() => {
    const totalCount = getHoldTotalCount(selectedHoldList);
    setTotalHoldCount(totalCount);
    setData(
      holdToClimbingHistories(selectedHoldList.filter((hold) => hold.count > 0))
    );
    setSelectedHoldList(selectedHoldList);
  }, [selectedHoldList, holdToClimbingHistories, setData, getHoldTotalCount]);

  /**
   * 다이얼로그 내 HoldImage 를 클릭 시, hold 숫자를 늘려주는 함수
   * @param indexHold 다이얼로그 내에서 선택하는 홀드의 수
   */
  const handleSelectHold = useCallback(
    (indexHold: Hold) => {
      const tempSelectedHoldList = selectedHoldList.map((item) =>
        indexHold.id === item.id ? { ...item, count: item.count + 1 } : item
      );
      // 홀드 최대 개수를 넘었는지 확인하는 로직
      if (getHoldTotalCount(tempSelectedHoldList) > maxCount) {
        toast(
          `너무 많은 홀드를 선택하셨습니다. 최대 ${maxCount}개의 홀드를 선택 할 수 있습니다.`
        );
        return;
      }
      setSelectedHoldList(tempSelectedHoldList);
    },
    [selectedHoldList, maxCount, toast, getHoldTotalCount]
  );

  /**
   * 다이얼로그 내 - 버튼 클릭 시, hold 숫자를 줄여주는 함수
   * @param indexHold 다이얼로그 내에서 선택하는 홀드의 수
   */
  const handleDeleteHold = useCallback(
    (indexHold: Hold) => {
      const tempSelectedHold = selectedHoldList.map((item) =>
        indexHold.id === item.id ? { ...item, count: item.count - 1 } : item
      );
      setSelectedHoldList(tempSelectedHold);
    },
    [selectedHoldList]
  );

  /**
   * onMount 시 작동할 로직이 들어가는 부분
   */
  useEffect(() => {
    //먼저 선택한 홀드 정보가 있으면
    if (preSelectedHoldList !== undefined) {
      const convertedHold = climbingHistoriesToHold(preSelectedHoldList);
      //선택된 홀드 총 갯수 계산
      const convertedHoldCount = getHoldTotalCount(convertedHold);
      setTotalHoldCount(convertedHoldCount);
      setSelectedHoldList(convertedHold);
    }
  }, [
    standardHoldList,
    preSelectedHoldList,
    climbingHistoriesToHold,
    getHoldTotalCount,
  ]);

  useEffect(() => {
    if (centerId === '') {
      setData([
        {
          climbingCount: 0,
          holdId: '',
        },
      ]);
    }
  }, [centerId]);

  if (standardHoldList)
    return (
      <>
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide">
          <label htmlFor="my-modal">
            <HoldImageButton count={totalHoldCount} maxCount={maxCount} />
          </label>
          {preSelectedHoldList !== undefined
            ? climbingHistoriesToHold(preSelectedHoldList).map((item) =>
                item.count !== 0 ? (
                  <HoldImage
                    key={`HoldListModal_Hold${item.id}`}
                    indexHold={item}
                    count={item.count}
                  />
                ) : null
              )
            : null}
        </div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            {centerId ? (
              <div className="w-full grid grid-cols-3 gap-y-4">
                {selectedHoldList.map((item) => (
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
              <EmptyContent message="암장 정보가 정확하지 않습니다." />
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

  return <HoldImageButton count={totalHoldCount} maxCount={maxCount} />;
};

export default memo(HoldListModal);
