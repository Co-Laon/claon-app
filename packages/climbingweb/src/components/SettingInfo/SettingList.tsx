interface ListProps {
  titleList?: string[];
  onClick?: ({}: any) => void;
}

export const SettingList = ({ titleList, onClick }: ListProps) => {
  return (
    <>
      {titleList && (
        <ul className="mt-10 h-screen w-screen pl-7 flex flex-col flex-end gap-y-6">
          {titleList.map((title, idx) => (
            <li
              key={`title${idx}`}
              className="font-normal text-sm"
              onClick={onClick}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
