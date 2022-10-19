import React from 'react';

interface CenterFacilitiesProps {
  facilities: string;
}

const CenterFacilities = ({ facilities }: CenterFacilitiesProps) => (
  <div className="flex flex-col gap-2">
    <h2 className="font-semibold text-sm">편의시설</h2>
    <div className=" ">{facilities}</div>
  </div>
);

export default CenterFacilities;
