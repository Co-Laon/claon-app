import { CenterDetailResponse } from 'climbingweb/types/response/center';
import CenterCharge from './CenterCharge';
import CenterFacilities from './CenterFacilities';
import CenterHoldList from './CenterHoldList';
import CenterOperatingTime from './CenterOperatingTime';
// import CenterSectorList from './CenterSectorList';

interface CenterDetailInfoProps {
  data: CenterDetailResponse;
}

export const CenterDetailInfo = ({ data }: CenterDetailInfoProps) => {
  const {
    operatingTimeList,
    facilities,
    //chargeList 의 경우 안에 chargeList 와 image 가 있음
    chargeList,
    holdInfoList,
    holdInfoImg,
    // sectorInfoList,
  } = data;

  return (
    <div className="flex flex-col p-7 ">
      <CenterOperatingTime operatingTimeList={operatingTimeList} />
      <CenterFacilities facilities={facilities} />
      <CenterCharge chargeList={chargeList} />
      <CenterHoldList holdInfoList={holdInfoList} holdInfoImg={holdInfoImg} />
      {/* <CenterSectorList sectorInfoList={sectorInfoList} /> */}
    </div>
  );
};
