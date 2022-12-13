import { UserDetailResponse } from 'climbingweb/types/response/user';
import React from 'react';
import UserRecord from './UserRecord';

interface UserRecordListProps {
  userDetailData: UserDetailResponse;
}

const UserRecordList = ({ userDetailData }: UserRecordListProps) => (
  <>
    {userDetailData.centerClimbingHistories.map((value, index) => (
      <UserRecord
        key={`UserRecord_${index}`}
        center={value.center}
        climbingHistories={value.climbingHistories}
      />
    ))}
  </>
);

export default UserRecordList;
