/**
 * 작성자: 윤웅재
 * GET /api/v1/notices
 * 특이사항: Pagination«NoticeResponseDto»
 */
export interface NoticeReponse {
  content: string;
  createdAt: string;
  title: string;
}
