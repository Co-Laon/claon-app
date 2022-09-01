import { ImageList } from '../common/ImageList';
import { TabBar } from '../common/TabBar';
import { CenterDetailInfo } from './CenterDetailInfo/CenterDetailInfo';
import { CenterReview } from './CenterDetailInfo/CenterReview';
import { CenterPost } from './CenterDetailInfo/CenterPost';
import { Tab } from '../common/TabBar/type';

interface ContentProps {
  imageList: string[];
}

export const CenterInfoContent = ({ imageList }: ContentProps) => {

  const tabList: Tab[] = [
    {
      id: 1,
      tabName: '상세정보',
      tabContent: <CenterDetailInfo />,
    },
    {
      id: 2,
      tabName: '리뷰',
      tabContent: <CenterReview />,
    },
    {
      id: 3,
      tabName: '게시글',
      tabContent: <CenterPost />,
    },
  ];

  return (
    <div>
      <ImageList imageList={imageList} />
      <TabBar tabList={tabList} />
    </div>
  );
};
