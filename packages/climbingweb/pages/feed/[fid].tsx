import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  ModifiedButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import { useGetPost } from 'climbingweb/src/hooks/queries/post/useGetPost';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function FeedPage({}) {
  //바텀시트 open state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);
  const router = useRouter();
  const { fid } = router.query;
  //fid string 거르는 로직, useRouter 에 대해 자세히 보고 추후 반드시 변경 해야함
  const feedId = fid as string;

  const {
    data: postData,
    isError: isPostError,
    error: postError,
  } = useGetPost(feedId);

  if (isPostError) return <div>{postError}</div>;

  if (postData)
    return (
      <section>
        <AppBar leftNode={<AppLogo />} rightNode={<ModifiedButton />} />
        <HomeFeed postData={postData} />
        <BottomSheet open={openBTSheet} onDismiss={() => setOpenBTSheet(false)}>
          <ListSheet
            headerTitle={''}
            list={['신고하기']}
            onSelect={() => router.push(`/report/${postData.postId}`)}
          />
        </BottomSheet>
      </section>
    );

  return <Loading />;
}
