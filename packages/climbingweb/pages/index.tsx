import type { NextPage } from 'next';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import Hold from 'climbingweb/src/interface/Hold';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  ModifiedButton,
  AppLogo,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { useRouter } from 'next/router';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { FeedEditSheet } from 'climbingweb/src/components/common/BottomSheetContents/FeedEditSheet';
interface Feed {
  imageList: string[];
  holdList: Hold[];
}

const Home: NextPage = () => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const handleCancelDeleteSheet = () => {
    setOpenSheet(false);
  };

  const handleConfirmDeleteSheet = () => {
    setOpenSheet(true);
  };

  const onEdit = () => {
    setOpenSheet(true);
  };

  const TestimageList = [''];

  const FeedList: Feed[] = [
    { imageList: TestimageList, holdList: [] },
    { imageList: TestimageList, holdList: [] },
    { imageList: TestimageList, holdList: [] },
    { imageList: TestimageList, holdList: [] },
  ];
  const router = useRouter();
  const onCreateFeed = () => {
    router.push('/feed/create');
  };

  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      <AppBar
        leftNode={<AppLogo />}
        rightNode={<ModifiedButton onClick={onCreateFeed} />}
      />
      {FeedList?.map(({ imageList, holdList }, idx) => (
        <HomeFeed
          key={`key${idx}`}
          imageList={imageList}
          holdList={holdList}
          onEdit={onEdit}
        />
      ))}
      <BottomSheet open={openSheet}>
        <FeedEditSheet
          onCancel={handleCancelDeleteSheet}
          onConfirm={handleConfirmDeleteSheet}
        />
      </BottomSheet>
    </div>
  );
};

export default Home;
