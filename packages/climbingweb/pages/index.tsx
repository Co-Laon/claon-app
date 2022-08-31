import type { NextPage } from 'next';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import Hold from 'climbingweb/src/interface/Hold';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  ModifiedButton,
  AppLogo,
} from 'climbingweb/src/components/common/IconButton';
import { useRouter } from 'next/router';

interface Feed {
  imageList: string[];
  holdList: Hold[];
}

const Home: NextPage = () => {
  const TestimageList = [''];
  const TestholdList: Hold[] = [{ url: '', count: 1 }];

  const FeedList: Feed[] = [
    { imageList: TestimageList, holdList: TestholdList },
    { imageList: TestimageList, holdList: TestholdList },
    { imageList: TestimageList, holdList: TestholdList },
    { imageList: TestimageList, holdList: TestholdList },
  ];
  const router = useRouter();
  const onCreateFeed = () => {
    router.push('/feed/create');
  };

  return (
    <div>
      <AppBar
        leftNode={<AppLogo />}
        rightNode={<ModifiedButton onClick={onCreateFeed} />}
      />
      {FeedList?.map(({ imageList, holdList }, idx) => (
        <HomeFeed key={`key${idx}`} imageList={imageList} holdList={holdList} />
      ))}
    </div>
  );
};

export default Home;
