import { AreaSheetHeader } from './AreaSheetHeader';

interface SheetProps {
  headerTitle: string;
  areaList: string[];
}

export const AreaSheet = ({ headerTitle, areaList }: SheetProps) => {
  return (
    <div className="flex flex-col p-4 gap-6">
      <AreaSheetHeader headerTitle={headerTitle} />
      <div className="flex flex-col gap-6 text-black">
        {areaList?.map((area) => (
          <p key={`areaKey${area}`}>{area}</p>
        ))}
      </div>
    </div>
  );
};
