import { FeedSkeleton } from './FeedSkeleton';
import { CommentSkeleton } from './CommentSkeleton';
import { UserFeedSkeleton } from './UserFeedSkeleton';
import { UserRecordSkeleton } from './UserRecordSkeleton';
import { UserResultSkeleton } from './UserResultSkeleton';
import { CenterImageSkeleton } from './CenterImageSkeleton';
import { CenterResultSkeleton } from './CenterResultSkeleton';

//eslint-disable-next-line
export default {
    title: 'WEB/Skeleton',
};

export const 피드스켈레톤 = () => <FeedSkeleton />;
export const 댓글스켈레톤 = () => <CommentSkeleton />;
export const 유저피드스켈레톤 = () => <UserFeedSkeleton />;
export const 유저기록스켈레톤 = () => <UserRecordSkeleton />;
export const 유저결과스켈레톤 = () => <UserResultSkeleton />;
export const 센터이미지스켈레톤 = () => <CenterImageSkeleton />;
export const 센터결과스켈레톤 = () => <CenterResultSkeleton />;
