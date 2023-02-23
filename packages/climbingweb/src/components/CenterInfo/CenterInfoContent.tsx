import { ImageList } from '../common/ImageList';
import { TabBar } from '../common/TabBar';
import { CenterDetailInfo } from './CenterDetailInfo/CenterDetailInfo';
import { CenterReview } from './CenterDetailInfo/CenterReview';
import { CenterPost } from './CenterDetailInfo/CenterPost';
import { Tab } from '../common/TabBar/type';
import { CenterDetailResponse } from 'climbingweb/types/response/center';
import { useMemo } from 'react';

interface ContentProps {
  data: CenterDetailResponse;
}

export const CenterInfoContent = ({ data }: ContentProps) => {
  const tabList: Tab[] = useMemo(
    () => [
      {
        id: 1,
        tabName: '상세정보',
        tabContent: <CenterDetailInfo data={data} />,
      },
      {
        id: 2,
        tabName: '리뷰',
        tabContent: <CenterReview centerId={data.id} />,
        contentCount: data.reviewCount,
      },
      {
        id: 3,
        tabName: '게시글',
        tabContent: <CenterPost centerId={data.id} />,
        contentCount: data.postCount,
      },
    ],
    [data]
  );

  return (
    <div>
      <ImageList imageList={data.imgList.map((value) => value.url)} />
      <TabBar tabList={tabList} />
    </div>
  );
};
