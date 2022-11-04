/**
 * 작성자: 윤웅재
 * 공통 인터페이스 Claon Pagination, 유명한 이름이라 바꿔야 할 수도 있음
 */
export interface Pagination<T> {
  nextPageNum: number;
  previousPageNum: number;
  results: T[];
  totalCount: number;
}
