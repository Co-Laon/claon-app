import { AppBar } from 'climbingweb/src/components/common/AppBar';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import {
  ClimbingHistories,
  PostData,
} from 'climbingweb/src/components/CreateFeed/type';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList/';
import { useState } from 'react';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import HoldListModal from 'climbingweb/src/components/CreateFeed/SelectHoldList/HoldListModal';
import Hold from 'climbingweb/src/interface/Hold';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import { NextButton } from 'climbingweb/src/components/common/AppBar/NextButton';
import { Input } from 'climbingweb/src/components/common/Input';

const holdListExample: Hold[] = [
  {
    id: '1',
    image:
      'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/white.png',
    name: '1번홀드',
    count: 0,
  },
  {
    id: '2',
    image:
      'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/yellow.png',
    name: '2번홀드',
    count: 0,
  },
  {
    id: '3',
    image:
      'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/blue.png',
    name: '3번홀드',
    count: 0,
  },
  {
    id: '4',
    image:
      'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/green.png',
    name: '4번홀드',
    count: 0,
  },
  {
    id: '5',
    image:
      'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/red.png',
    name: '5번홀드',
    count: 0,
  },
];

export default function CreatePostPage() {
  const [page, setPage] = useState<string>('first');
  const [postData, setPostData] = useState<PostData>({
    centerId: '',
    climbingHistories: [
      {
        climbingCount: 0,
        holdId: '',
      },
    ],
    content: '',
    contentsList: [
      {
        url: '',
      },
    ],
  });

  /**
   * 내용 입력 핸들링 함수
   * @param content
   */
  const handleContentInput = (content: string) => {
    setPostData({ ...postData, content });
  };

  /**
   * 홀드 입력 핸들링 함수
   * @param climbingHistories postData 중 hold 에 관한 정보를 담는 객체
   */
  const handleClimbingHistoriesInput = (
    climbingHistories: ClimbingHistories[]
  ) => {
    setPostData({ ...postData, climbingHistories });
  };
  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      <AppBar
        title="새 게시물"
        leftNode={<BackButton onClick={() => setPage('first')} />}
        rightNode={<NextButton pageState={page} setPageState={setPage} />}
      />
      <div className="p-4">
        {page === 'first' ? (
          <div className="flex flex-col gap-4">
            <PageSubTitle title={'사진'} />
            <UploadImageList />
            <PageSubTitle title={'내용'} />
            <TextArea
              data={postData.content}
              setData={handleContentInput}
              placeholder="500자 이내 글 입력"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <PageSubTitle title={'암장 이름'} />
            <Input />
            <PageSubTitle title={'완등 횟수'} />
            <HoldListModal
              maxCount={10}
              indexHoldList={holdListExample}
              climbingHistories={postData.climbingHistories}
              setData={handleClimbingHistoriesInput}
            />
          </div>
        )}
      </div>
    </div>
  );
}
