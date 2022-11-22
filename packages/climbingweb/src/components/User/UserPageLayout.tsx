import React from 'react';
import PageSubTitle from '../common/PageSubTitle/PageSubTitle';

interface UserPageProps {
  appBar: React.ReactNode;
  userHead: React.ReactNode;
  userRecordList: React.ReactNode;
  userFeedList: React.ReactNode;
}

/**
 * 유저 페이지 레이아웃 컴포넌트 Props
 *
 * @prop {React.ReactNode} appBar 앱바 컴포넌트
 * @prop {React.ReactNode} userHead 헤더 컴포넌트
 * @prop {React.ReactNode} userRecordList 기록 컴포넌트
 * @prop {React.ReactNode} userFeedList 피드 컴포넌트
 */
const UserPageLayout = ({
  appBar,
  userHead,
  userRecordList,
  userFeedList,
}: UserPageProps) => (
  <section className="mx-4 mb-footer">
    {appBar}
    {userHead}
    <PageSubTitle title="기록" />
    <div className="flex overflow-auto scrollbar-hide h-40">
      {userRecordList}
    </div>
    <PageSubTitle title="게시글" />
    {userFeedList}
  </section>
);

export default UserPageLayout;
