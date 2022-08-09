import type { NextPage } from 'next';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import Hold from 'climbingweb/src/interface/Hold';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { ModifiedButton, AppLogo } from 'climbingweb/src/components/common/IconButton';

const Home: NextPage = () => {

  const imageList = [''];
  const holdList: Hold[] = [{ url: '', count: 1 }];

  return (
    <div>
      <AppBar leftNode={<AppLogo />} rightNode={<ModifiedButton />} />
      <HomeFeed imageList={imageList} holdList={holdList} />
    </div>
  );
};

export default Home;