import CenterResult from './CenterResult';
import { CenterListProps } from './type';

const CenterResultList = ({ centerList }: CenterListProps) => {
  return (
    <div className="w-full flex flex-row gap-1 overflow-x-auto scrollbar-hide">
      {centerList?.map(({ name, star, image, id }) => (
        <CenterResult
          key={name}
          name={name}
          image={image}
          star={star}
          id={id}
        />
      ))}
    </div>
  );
};

export default CenterResultList;
