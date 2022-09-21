import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { NextButton } from 'climbingweb/src/components/common/NextButton';
import CenterSearchBar from 'climbingweb/src/components/CreateFeed/CenterSearchBar';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { PostData } from 'climbingweb/src/components/CreateFeed/type';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList/';
import { useState } from 'react';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';

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

  const handleContentInput = (content: string) => {
    setPostData({ ...postData, content });
  };
  let test: string[] = ['test', 'testest', 'tttt'];
  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      <AppBar
        title="새 게시물"
        leftNode={<BackButton />}
        rightNode={<NextButton pageState={page} setPageState={setPage} />}
      />
      <div className="p-4">
        {page === 'first' ? (
          <div className="flex flex-col gap-10">
            <UploadImageList />
            <TextArea
              data={postData.content}
              setData={handleContentInput}
              placeholder="500자 이내 글 입력"
            />
          </div>
        ) : (
          <>
            <CenterSearchBar searchedCenter={test} />
          </>
        )}
      </div>
    </div>
  );
}
