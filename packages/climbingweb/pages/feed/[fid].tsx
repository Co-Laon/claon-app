import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  ModifiedButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';

export default function FeedPage({}) {
  return (
    <section>
      <AppBar leftNode={<AppLogo />} rightNode={<ModifiedButton />} />
      <HomeFeed imageList={[]} holdList={[]} />
    </section>
  );
}
