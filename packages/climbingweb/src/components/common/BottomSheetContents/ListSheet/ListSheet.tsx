import { ListSheetProps } from '../type';
import { SheetHeader } from './SheetHeader';

export const ListSheet = ({
  headerTitle,
  list,
  onSelect,
  className,
}: ListSheetProps) => {
  return (
    <div className="flex flex-col p-4 gap-6">
      <SheetHeader headerTitle={headerTitle} />
      <div className="flex flex-col text-center gap-6 text-gray-600">
        {list?.map((area) => (
          <p
            className={`${className}`}
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
