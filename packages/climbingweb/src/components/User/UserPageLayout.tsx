import { Pagination } from 'climbingweb/types/common';
import {
  UserDetailResponse,
  UserPostThumbnailResponse,
} from 'climbingweb/types/response/user';
import React from 'react';
import { InfiniteData } from 'react-query';
import EmptyContent from '../common/EmptyContent/EmptyContent';
import PageSubTitle from '../common/PageSubTitle/PageSubTitle';
import UserFeedList from './UserFeedList';
import UserRecordList from './UserRecordList';

interface UserPageProps {
  appBar: React.ReactNode;
  userHead: React.ReactNode;
  userDetailData: UserDetailResponse;
  userPostData: InfiniteData<Pagination<UserPostThumbnailResponse>>;
  isPostDataHasNextPage: boolean;
  infiniteScrollTarget: React.RefObject<HTMLDivElement>;
}

/**
 * 유저 페이지 레이아웃 컴포넌트 Props
 *
 * @prop {React.ReactNode} appBar 앱바 컴포넌트
 * @prop {React.ReactNode} userHead 헤더 컴포넌트
 * @prop {UserDetailResponse} userDetailData 유저 정보
 * @prop {InfiniteData<Pagination<UserPostThumbnailResponse>>} userPostData 유저가 올린 포스트 정보
 * @prop {boolean} isPostDataHasNextPage 유저가 올린 포스트 정보가 다음 페이지가 있는지 여부
 * @prop {React.RefObject<HTMLDivElement>} infiniteScrollTarget 무한 스크롤을 위한 Intersection Observer target
 */
const UserPageLayout = ({
  appBar,
  userHead,
  userDetailData,
  userPostData,
  isPostDataHasNextPage,
  infiniteScrollTarget,
}: UserPageProps) => (
  <section className="mx-4 mb-footer">
    {appBar}
    {userHead}
    <PageSubTitle title="기록" />
    <div className="flex overflow-auto scrollbar-hide h-40">
      {userDetailData.centerClimbingHistories.length !== 0 ? (
        <UserRecordList userDetailData={userDetailData} />
      ) : (
        <EmptyContent message="아직 기록이 없습니다." />
      )}
    </div>
    <PageSubTitle title="게시글" />
    {userPostData.pages[0].totalCount !== 0 ? (
      <UserFeedList
        userPostData={userPostData}
        isPostDataHasNextPage={isPostDataHasNextPage}
        infiniteScrollTarget={infiniteScrollTarget}
      />
    ) : (
      <EmptyContent message="아직 게시글이 없습니다." />
    )}
  </section>
);

export default UserPageLayout;
