import { SheetHeader } from './SheetHeader';

interface SheetProps {
  headerTitle: string;
  list: string[];
}

export const ListSheet = ({ headerTitle, list }: SheetProps) => {
  return (
    <div className="flex flex-col p-4 gap-6">
      <SheetHeader headerTitle={headerTitle} />
      <div className="flex flex-col gap-6 text-black">
        {list?.map((area) => (
          <p key={`areaKey${area}`}>{area}</p>
        ))}
      </div>
    </div>
  );
};
