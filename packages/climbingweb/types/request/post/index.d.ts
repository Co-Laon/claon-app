import { PostContents } from '../../response/post';

/**
 * POST /api/v1/posts api
 */
export interface PostCreateRequest {
  centerId: string;
  climbingHistories?: ClimbingHistoryRequest[];
  content?: string;
  contentsList: PostContents[];
}

export interface PostRequest {
  centerId: string;
  climbingHistories?: ClimbingHistoryRequest[];
  content?: string;
  contentsList: PostContents[];
}

export interface ClimbingHistoryRequest {
  climbingCount: number;
  holdId: string;
}

export interface PostReportRequest {
  content: string;
  reportType: '부적절한 게시글' | '부적절한 닉네임' | '잘못된 암장 선택';
}

export interface CommentCreateRequest {
  content: string;
  parentCommentId?: string;
}

export interface CommentUpdateRequest {
  content: string;
}
