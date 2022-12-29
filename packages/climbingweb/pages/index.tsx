import type { NextPage } from 'next';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  ModifiedButton,
  AppLogo,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import { useRouter } from 'next/router';
import { useGetLaonPost } from 'climbingweb/src/hooks/queries/laon/queryKey';
import { useGetPosts } from 'climbingweb/src/hooks/queries/post/queryKey';

const Home: NextPage = () => {
  const router = useRouter();
  //laon feed data useQuery
  const {
    data: laonPostsData,
    isError: isLaonPostsDataError,
    error: laonPostsDataError,
    fetchNextPage: fetchNextLaonPosts,
    isFetchingNextPage: isFetchingLaonPosts,
    hasNextPage: hasNextLaonPosts,
  } = useGetLaonPost();

  //global feed data useQuery
  const {
    data: postsData,
    isError: isPostsDataError,
    error: postsDataError,
    fetchNextPage: fetchNextPosts,
    isFetchingNextPage: isFetchingPosts,
    hasNextPage: hasNextPosts,
  } = useGetPosts();

  //피드 추가 버튼 클릭 핸들러
  const onClickCreateFeed = () => {
    router.push('/feed/create');
  };

  //intersect 핸들러
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextLaonPosts) {
        fetchNextLaonPosts();
      } else if (hasNextPosts) {
        fetchNextPosts();
      }
    },
    { threshold: 1 }
  );

  if (isPostsDataError) return <ErrorContent error={postsDataError} />;
  if (isLaonPostsDataError) return <ErrorContent error={laonPostsDataError} />;

  if (postsData && laonPostsData)
    return (
      <div className="mb-footer overflow-auto scrollbar-hide">
        <AppBar
          className="fixed top-0 z-10 bg-white w-full"
          leftNode={<AppLogo />}
          rightNode={<ModifiedButton onClick={onClickCreateFeed} />}
        />
        <div className="h-16"></div>
        {laonPostsData.pages.map((page) => {
          return page.results.map((result, index) => (
            <HomeFeed key={`laonPostsDataFeed_${index}`} postData={result} />
          ));
        })}
        {!hasNextLaonPosts ? (
          <div className="m-4 font-medium">추천 게시글</div>
        ) : null}
        {postsData.pages.map((page) => {
          return page.results.map((result, index) => (
            <HomeFeed key={`postsDataFeed_${index}`} postData={result} />
          ));
        })}
        {!isFetchingPosts && !isFetchingLaonPosts ? (
          <div className="h-[1px]" ref={target}></div>
        ) : (
          <Loading />
        )}
      </div>
    );

  return <Loading />;
};

export default Home;
