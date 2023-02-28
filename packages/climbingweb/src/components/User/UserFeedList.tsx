import { Pagination } from 'climbingweb/types/common';
import { UserPostThumbnailResponse } from 'climbingweb/types/response/user';
import React from 'react';
import { InfiniteData } from 'react-query';
import Loading from '../common/Loading/Loading';
import UserFeed from './UserFeed';

interface UserFeedListProps {
  userPostData: InfiniteData<Pagination<UserPostThumbnailResponse>>;
  isPostDataHasNextPage: boolean;
  infiniteScrollTarget: React.RefObject<HTMLDivElement>;
}

const UserFeedList = ({
  userPostData,
  isPostDataHasNextPage,
  infiniteScrollTarget,
}: UserFeedListProps) => (
  <div className="w-full grid grid-cols-2 mb-footer overflow-auto scrollbar-hide gap-3">
    {userPostData.pages.map((page, pIndex) =>
      page.results.map((result, rIndex) => (
        <UserFeed
          key={`userPost${pIndex}${rIndex}`}
          postId={result.postId}
          centerName={result.centerName}
          image={result.thumbnailUrl}
          climbingHistories={result.climbingHistories}
        />
      ))
    )}
    {!isPostDataHasNextPage ? (
      <div className="h-[1px]" ref={infiniteScrollTarget}></div>
    ) : (
      <Loading />
    )}
  </div>
);

export default UserFeedList;
