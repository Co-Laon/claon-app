import { CenterPreviewResponse } from '../center/index';
import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';

export interface BlockUserFindResponse {
  blockUserNickName: string;
  blockUserProfileImage: string;
}

export interface UserResponse {
  apeIndex: number;
  armReach: number;
  email: string;
  height: number;
  imagePath: string;
  instagramOAuthId: string;
  instagramUserName: string;
  isPrivate: boolean;
  nickname: string;
}

export interface PublicScopeResponse {
  isPrivate: boolean;
}

export interface UserPostThumbnailResponse {
  centerName: string;
  climbingHistories: ClimbingHistoryResponse[];
  postId: string;
  thumbnailUrl: string;
}

export interface IndividualUserResponse {
  apeIndex: number;
  armReach: number;
  centerClimbingHistories: CenterClimbingHistoryResponse[];
  climbCount: number;
  height: number;
  imagePath: string;
  instagramUrl: string;
  isLaon: boolean;
  isPrivate: boolean;
  laonCount: number;
  nickname: string;
  postCount: number;
}

export interface CenterClimbingHistoryResponse {
  center: CenterPreviewResponse;
  climbingHistories: ClimbingHistoryResponse[];
}

export interface UserPreviewResponse {
  imagePath: string;
  isLaon: boolean;
  nickname: string;
}
