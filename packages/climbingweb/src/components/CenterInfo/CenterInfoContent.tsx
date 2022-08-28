import { ImageList } from '../common/ImageList';
import { TabBar } from '../common/TabBar';

interface ContentProps {
  imageList: string[];
}

export const CenterInfoContent = ({ imageList }: ContentProps) => {
  return (
    <div>
      <ImageList imageList={imageList} />
      <TabBar />
    </div>
  );
};
