import { ListSheetProps } from '../type';
import { SheetHeader } from './SheetHeader';

export const ListSheet = ({ headerTitle, list, onSelect }: ListSheetProps) => {
  return (
    <div className="flex flex-col pl-[20px] pr-[20px] pt-[10px] pb-[20px] gap-[20px]">
      <SheetHeader headerTitle={headerTitle} />
      <div className="flex flex-col text-center gap-6 text-gray-600">
        {list?.map((area) => (
          <p
            className="text-left"
            onTouchEnd={() => onSelect(area)}
            key={`areaKey${area}`}
          >
            {area}
          </p>
        ))}
      </div>
    </div>
  );
};
