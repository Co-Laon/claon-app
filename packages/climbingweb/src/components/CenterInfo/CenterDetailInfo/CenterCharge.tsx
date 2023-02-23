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
    <div className="flex flex-col gap-2 mt-[24px]">
      <div className={'flex justify-between'}>
        <h2 className={'font-medium text-sm'}>이용 요금</h2>
        <button
          className={'bg-none text-xs leading-[18px] text-[#5953ff]'}
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
                className={
                  'flex justify-between items-center text-xs leading-[18px] font-normal'
                }
                key={`chargeListInner_${innerIdx}`}
              >
                <span className={'w-[60%]'}>{inner.name}</span>
                <span>{`${inner.fee}`}</span>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CenterCharge;
