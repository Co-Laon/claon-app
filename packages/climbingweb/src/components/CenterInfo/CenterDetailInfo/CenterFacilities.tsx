import React from 'react';

interface CenterFacilitiesProps {
  facilities: string;
}

const CenterFacilities = ({ facilities }: CenterFacilitiesProps) => (
  <div className="flex flex-col gap-2 mt-[32px]">
    <h2 className="font-medium text-sm">편의시설</h2>
    <div className="text-xs font-normal leading-[18px]">{facilities}</div>
  </div>
);

export default CenterFacilities;
