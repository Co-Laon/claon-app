/**
 * 피드의 홀드 정보를 가져올 떄 사용할 인터페이스
 * id: backend 에서 관리하는 hold id
 * image: image 주소
 * name: hold 이름
 * count: frontend 에서 보여줄 hold 의 개수
 */
export default interface Hold {
  id: string;
  image: string;
  name: string;
  count: number;
}
