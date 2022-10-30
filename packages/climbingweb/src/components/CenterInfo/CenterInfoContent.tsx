import { ImageList } from '../common/ImageList';
import { TabBar } from '../common/TabBar';
import { CenterDetailInfo } from './CenterDetailInfo/CenterDetailInfo';
import { CenterReview } from './CenterDetailInfo/CenterReview';
import { CenterPost } from './CenterDetailInfo/CenterPost';
import { Tab } from '../common/TabBar/type';
import { CenterDetailResponse } from 'climbingweb/types/response/center';

interface ContentProps {
  data: CenterDetailResponse;
}

export const CenterInfoContent = ({ data }: ContentProps) => {
  const tabList: Tab[] = [
    {
      id: 1,
      tabName: '상세정보',
      tabContent: <CenterDetailInfo data={data} />,
    },
    {
      id: 2,
      tabName: '리뷰',
      tabContent: <CenterReview id={data.id} />,
    },
    {
      id: 3,
      tabName: '게시글',
      tabContent: <CenterPost centerId={data.id} />,
    },
  ];

  return (
    <div>
      <ImageList imageList={data.imgList.map((value) => value.url)} />
      <TabBar tabList={tabList} />
    </div>
  );
};
