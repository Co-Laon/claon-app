import RecordDetailSvg from 'climbingweb/src/assets/icon/RecordDetailISvg';
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
  <section className="mb-footer">
    {appBar}
    <div className="mx-4">
      {userHead}
      <div className="flex justify-between mt-5">
        <PageSubTitle title="기록" className="text-base" />
        <RecordDetailSvg />
      </div>
      <div className="flex overflow-auto scrollbar-hide my-2 mb-4">
        {userRecordList}
      </div>
      <PageSubTitle title="게시글" className="text-base my-2" />
      {userFeedList}
    </div>
  </section>
);

export default UserPageLayout;
