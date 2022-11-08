import { ClimbingHistoryResponse } from '../post';

/**
 * 작성자: 윤웅재
 * GET /api/v1/laon
 * 특이사항: Pagination«LaonFindResponseDto»
 */
export interface LaonFindResponse {
  laonNickname: string;
  laonProfileImage: string;
}

/**
 * 작성자: 윤웅재
 * POST /api/v1/laon/{laonNickname}
 * 특이사항: 201 Created
 */

/**
 * 작성자: 윤웅재
 * DELETE /api/v1/laon/{laonNickname}
 * 특이사항: 200 OK
 */

/**
 * 작성자: 윤웅재
 * GET /api/v1/laon/posts
 * 특이사항: Pagination«UserPostDetailResponseDto»
 */
export interface UserPostDetailResponse {
  centerId: string;
  centerName: string;
  climbingHistories: ClimbingHistoryResponse[];
  content: string;
  contentsList: string[];
  createdAt: string;
  isLike: boolean;
  likeCount: number;
  postId: string;
  userNickname: string;
  userProfile: string;
}
