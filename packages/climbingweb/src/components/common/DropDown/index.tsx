import ArrowDown from 'climbingweb/src/assets/icon/ic_20_arrow_down_gray400.svg';

interface DropDownProps {
  value: string;
  onSheetOpen?: ({}: any) => void;
  placeholder?: string;
}

export const DropDown = ({
  value,
  onSheetOpen,
  placeholder,
}: DropDownProps) => {
  return (
    <div
      className="border-2 border-gray-300 h-[52px] w-full bg-white rounded-lg relative flex flex-row items-center justify-between px-4"
      onClick={onSheetOpen}
    >
      <input
        value={value}
        disabled
        className="h-full w-full outline-0 disabled:bg-white"
        placeholder={placeholder}
      />
      <ArrowDown alt="arrow_down" />
    </div>
  );
};
