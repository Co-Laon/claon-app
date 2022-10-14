import { ListSheetProps } from '../type';
import { SheetHeader } from './SheetHeader';

export const ListSheet = ({ headerTitle, list, onSelect }: ListSheetProps) => {
  return (
    <div className="flex flex-col p-4 gap-6">
      <SheetHeader headerTitle={headerTitle} />
      <div className="flex flex-col gap-6 text-black">
        {list?.map((area) => (
          <p onTouchEnd={() => onSelect(area)} key={`areaKey${area}`}>
            {area}
          </p>
        ))}
      </div>
    </div>
  );
};
