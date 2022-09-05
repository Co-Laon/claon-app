import { Divder } from '../../divder/Divder';

interface HeaderProps {
  headerTitle: string;
}

export const SheetHeader = ({ headerTitle }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-black font-bold text-sm">{headerTitle}</h1>
      <Divder />
    </div>
  );
};
