import { LaonItem } from './LaonItem';
import { LaonListProps } from './type';

export const LaonList = ({ laonList }: LaonListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {laonList?.map(({ laonNickName, laonProfileImage, rightNode }, idx) => (
        <LaonItem
          key={`laonKey${idx}`}
          laonNickName={laonNickName}
          laonProfileImage={laonProfileImage}
          rightNode={rightNode}
        />
      ))}
    </ul>
  );
};
