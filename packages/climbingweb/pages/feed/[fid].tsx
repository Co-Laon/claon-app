import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  ModifiedButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import { useRouter } from 'next/router';

export default function FeedPage({}) {
  const router = useRouter();
  const { fid } = router.query;
  //fid string 거르는 로직, useRouter 에 대해 자세히 보고 추후 반드시 변경 해야함
  const feedId = fid ? (Array.isArray(fid) ? fid[0] : fid) : '';

  return (
    <section>
      <AppBar leftNode={<AppLogo />} rightNode={<ModifiedButton />} />
      <HomeFeed postId={feedId} />
    </section>
  );
}
