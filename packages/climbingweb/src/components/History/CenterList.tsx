import { CenterListResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';

interface CenterListProps extends CenterListResponse {
  onClick: (id: string) => void;
  focused?: boolean;
}

function CenterList({
  centerId,
  centerName,
  centerThumbnailUrl,
  onClick,
  focused = false,
}: CenterListProps) {
  const border = useMemo(
    () => (focused ? 'border-4 border-[#5953FF]' : ''),
    [focused]
  );

  useEffect(() => {
    console.log(border);
  }, [border]);
  return (
    <div onClick={() => onClick(centerId)} className=" flex flex-col  gap-1">
      <div
        className={`w-14 h-14 flex justify-center items-center rounded-full ${border}`}
      >
        <Image
          width={52}
          height={52}
          src={centerThumbnailUrl}
          alt={centerId}
          className="rounded-full"
        />
      </div>
      <p className="text-[8px] leading-[14px] font-bold text-center tracking-tighter">
        {centerName.length > 6 ? `${centerName.slice(0, 6)}...` : centerName}
      </p>
    </div>
  );
}
export default CenterList;
