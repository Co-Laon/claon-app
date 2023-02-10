import { Divder } from '../../divder/Divder';

interface HeaderProps {
  headerTitle: string;
}

export const SheetHeader = ({ headerTitle }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-black font-bold text-sm">{headerTitle}</h1>
      {headerTitle == '' ? null : <Divder />}
    </div>
  );
};
