export interface PostResponse {
  centerId: string;
  centerName: string;
  climbingHistories: ClimbingHistoryResponse[];
  content: string;
  contentsList: string[];
  createdAt: string;
  isDeleted: boolean;
  likeCount: number;
  postId: string;
  userNickname: string;
  userProfile: string;
}

export interface PostDetailResponse {
  centerId: string;
  centerName: string;
  climbingHistories: ClimbingHistoryResponse[];
  content: string;
  contentsList: string[];
  createdAt: string;
  isLike: boolean;
  isOwner: boolean;
  likeCount: number;
  postId: string;
  userNickname: string;
  userProfile: string;
}

export interface PostDeleteResponse {
  centerId: string;
  centerName: string;
  climbingHistories: ClimbingHistoryResponse[];
  content: string;
  contentList: string[];
  createdAt: string;
  isDeleted: boolean;
  likeCount: number;
  postId: string;
  userNickname: string;
  userProfile: string;
}

export interface PostContents {
  url: string;
}

export interface ClimbingHistoryResponse {
  climbingCount: number;
  holdId: string;
  holdImage: string;
}

export interface CommentFindResponse {
  childrenCommentCount: number;
  commentId: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  isOwner: boolean;
  postId: string;
  updatedAt: string;
  writerNickname: string;
  writerProfileImage: string;
}

export interface ChildCommentResponse {
  commentId: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  postId: string;
  updatedAt: string;
  writerNickname: string;
  writerProfileImage: string;
  isOwner?: boolean;
}

export interface LikeFindResponse {
  likerNickname: string;
  likerProfileImage: string;
  postId: string;
}

export interface LikeResponse {
  likeCount: number;
  postId: string;
}

export interface CommentResponse {
  commentId: string;
  content: string;
  isDeleted: boolean;
  parentCommentId: string;
  postId: string;
}

export interface PostReportResponse {
  content: string;
  postId: string;
  reportType: '부적절한 게시글' | '부적절한 닉네임' | '잘못된 암장 선택';
}
