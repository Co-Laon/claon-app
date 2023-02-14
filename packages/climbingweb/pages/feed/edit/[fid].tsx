import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import { NextButton } from 'climbingweb/src/components/common/AppBar/NextButton';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { CenterSearchInput } from 'climbingweb/src/components/CreateFeed/CenterSearchInput';
import HoldListModal from 'climbingweb/src/components/CreateFeed/SelectHoldList/HoldListModal';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList';
import {
  useFindHoldInfoByCenter,
  useSearchCenterName,
} from 'climbingweb/src/hooks/queries/center/queryKey';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import { useRef, useState } from 'react';

function EditFeed() {
  const [page, setPage] = useState<string>('first');
  const { postData, setPostData, postImageList, initPost } =
    useCreatePostForm();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selected, setSelected] = useState(false);
  const { data: centerList } = useSearchCenterName(searchInput);
  const { data: holdListData } = useFindHoldInfoByCenter(postData.centerId);

  const handlePostDataSubmit = () => {};
  const handleContentInput = () => {};
  const handleCenterIdInput = () => {};
  const handleSearchInputChange = () => {};
  const handleClimbingHistoriesInput = () => {};
  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      <AppBar
        title="게시글 수정"
        leftNode={<BackButton onClick={() => {}} />}
        rightNode={
          <NextButton
            pageState={page}
            setPageState={setPage}
            onSubmit={page === 'second' ? handlePostDataSubmit : null}
          />
        }
      />
      <div className="p-4">
        {page === 'first' ? (
          <div className="flex flex-col gap-4">
            <PageSubTitle
              title={'사진'}
              className="px-[4px] text-base font-bold"
            />
            <UploadImageList />
            <PageSubTitle
              title={'내용'}
              className="px-[4px] text-base font-bold"
            />
            <TextArea
              data={postData.content}
              setData={handleContentInput}
              placeholder="500자 이내 글 입력"
              className="w-[89vw] h-[32.4vh] ml-[4px] mr-[4px]"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <PageSubTitle
              title={'암장 이름'}
              className="px-[4px] text-base font-bold"
            />
            <CenterSearchInput
              refObj={searchInputRef}
              selected={selected}
              setSelected={setSelected}
              setData={handleCenterIdInput}
              initialValue={searchInput}
              centerList={centerList}
              onChange={handleSearchInputChange}
              className="px-[4px] min-h-[52px]"
            />
            <PageSubTitle
              title={'완등 횟수'}
              className="px-[4px] text-base font-bold"
            />
            <HoldListModal
              maxCount={10}
              centerId={postData.centerId}
              standardHoldList={holdListData}
              preSelectedHoldList={postData.climbingHistories}
              setData={handleClimbingHistoriesInput}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default EditFeed;
