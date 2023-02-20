import CenterResult from './CenterResult';
import { CenterProps } from './CenterResult';

interface CenterListProps {
  centerList: CenterProps[];
}

const CenterResultList = ({ centerList }: CenterListProps) => {
  return (
    <div className="w-full flex flex-row gap-[5px] overflow-x-auto scrollbar-hide">
      {centerList.map(({ id, name, thumbnailUrl, reviewRank }) => (
        <CenterResult
          key={name}
          name={name}
          thumbnailUrl={thumbnailUrl}
          reviewRank={reviewRank}
          id={id}
        />
      ))}
    </div>
  );
};

export default CenterResultList;
