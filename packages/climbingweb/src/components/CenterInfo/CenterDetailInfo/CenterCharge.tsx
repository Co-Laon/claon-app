import { Charge } from 'climbingweb/types/response/center';
import React from 'react';

interface CenterChargeProps {
  chargeList: Charge[];
}

const CenterCharge = ({ chargeList }: CenterChargeProps) => {
  //TODO - 이미지로 보기 클릭 시?
  const handleShowImageButtonClick = () => {
    console.dir(chargeList.map((value) => value.image));
  };
  return (
    <div className="flex flex-col gap-2">
      <div className={'flex justify-between'}>
        <h2 className={'font-semibold text-sm'}>이용 요금</h2>
        <button
          className={'bg-none text-sm text-purple-500'}
          onClick={handleShowImageButtonClick}
        >
          이미지로 보기
        </button>
      </div>
      <ul>
        {chargeList.map((outer, outerIdx) => (
          <div
            className={'flex flex-col gap-2'}
            key={`chargeListOuter_${outerIdx}`}
          >
            {outer.chargeList.map((inner, innerIdx) => (
              <li
                className={'flex justify-between items-center'}
                key={`chargeListInner_${innerIdx}`}
              >
                <text className={'w-[60%]'}>{inner.name}</text>
                <text>{`${inner.fee}`}</text>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CenterCharge;
