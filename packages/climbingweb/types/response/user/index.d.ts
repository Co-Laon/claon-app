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

export interface CenterInfoResponse {
  centerId: string;
  centerImg: string;
  centerName: string;
}

export interface CenterListResponse {
  centerId: string;
  centerName: string;
  centerThumbnailUrl: string;
}

export interface HistoryResponse {
  climbingCount: number;
  holdId: string;
  holdImage: string;
}
export interface HistoryDateResponse {
  centerInfo: CenterInfoResponse;
  histories: HistoryResponse[];
}

export interface UserDetailResponse {
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
  center: UserCenterPreviewResponse;
  climbingHistories: ClimbingHistoryResponse[];
}

export interface UserPreviewResponse {
  imagePath: string;
  isLaon: boolean;
  nickname: string;
}

export interface CenterHistory {
  createdAt: string;
  histories: HistoryResponse[];
  postId: string;
}

export interface HistoryByCenterResponse {
  date: string;
  histories: CenterHistory[];
}
