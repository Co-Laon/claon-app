import type { NextPage } from 'next';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  ModifiedButton,
  AppLogo,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import Router from 'next/router';
import 'react-spring-bottom-sheet/dist/style.css';
import { useGetPosts } from 'climbingweb/src/hooks/queries/post/useGetPosts';
import { useGetLaonPost } from 'climbingweb/src/hooks/queries/laon/useGetLaonPost';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';

const Home: NextPage = () => {
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
    Router.push('/feed/create');
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

  if (isPostsDataError) return <div>{postsDataError}</div>;
  if (isLaonPostsDataError) return <div>{laonPostsDataError}</div>;

  if (postsData && laonPostsData)
    return (
      <div className="mb-footer overflow-auto scrollbar-hide">
        <AppBar
          leftNode={<AppLogo />}
          rightNode={<ModifiedButton onClick={onClickCreateFeed} />}
        />
        <>
          {laonPostsData.pages.map((page) => {
            return page.results.map((result, index) => (
              <HomeFeed key={`laonPostsDataFeed_${index}`} postData={result} />
            ));
          })}
        </>
        {!hasNextLaonPosts ? (
          <div className="m-4 font-medium">
            <div className="h-[1px] my-2 bg-slate-300"></div>
            <div>추천 게시글</div>
            <div className="h-[1px] my-2 bg-slate-300"></div>
          </div>
        ) : null}
        <>
          {postsData.pages.map((page) => {
            return page.results.map((result, index) => (
              <HomeFeed key={`postsDataFeed_${index}`} postData={result} />
            ));
          })}
        </>
        {!isFetchingPosts && !isFetchingLaonPosts ? (
          <div className="h-[1px] bg-slate-300" ref={target}></div>
        ) : (
          <div>로딩 중...</div>
        )}
      </div>
    );

  return <div>로딩 중...</div>;
};

export default Home;
