import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  changePublicScope,
  createBlock,
  findBlockUser,
  findPostsByUser,
  getPublicUser,
  modifyUser,
  retrieveMe,
  retrieveMyAccount,
  searchUser,
} from './queries';

/**
 * user-controller api 의 query key factory
 */
export const userQueries = createQueryKeys('users', {
  me: () => ({
    queryKey: ['me'],
    queryFn: () => retrieveMe(),
    contextQueries: {
      account: () => ({
        queryKey: ['account'],
        queryFn: () => retrieveMyAccount(),
      }),
    },
  }),
  block: () => ({
    queryKey: ['block'],
    queryFn: () => findBlockUser(),
  }),
  search: (name: string) => ({
    queryKey: [name],
    queryFn: () => searchUser(name),
  }),
  name: (nickname: string) => ({
    queryKey: [nickname],
    queryFn: () => getPublicUser(nickname),
    contextQueries: {
      posts: () => ({
        queryKey: ['posts'],
        queryFn: (context) => findPostsByUser(context?.pageParam, nickname),
      }),
    },
  }),
});

/**
 * changePublicScope api (회원 정보 공개 변경) 의 useMutation hooks
 *
 * @returns changePublicScope api (회원 정보 공개 변경) 의 useMutation return 값
 */
export const useChangePublicScope = () => {
  const queryClient = useQueryClient();
  return useMutation(changePublicScope, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.me());
    },
  });
};

/**
 * createBlock api (회원 차단) 의 useMutation hooks
 *
 * @returns createBlock api (회원 차단) 의 useMutation return 값
 */
export const useCreateBlock = () => {
  const queryClient = useQueryClient();
  return useMutation(createBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.block());
    },
  });
};

/**
 * deleteBlock api (차단 삭제) 의 useMutation hooks
 *
 * @returns deleteBlock api (차단 삭제) 의 useMutation return 값
 */
export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  return useMutation(createBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.block());
    },
  });
};

/**
 * findBlockUser api (차단 목록 조회) 의 useInfiniteQuery hooks
 *
 * @returns findBlockUser api (차단 목록 조회) 의 useInfiniteQuery return 값
 */
export const useFindBlockUser = () => {
  return useInfiniteQuery({
    ...userQueries.block(),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * findPostsByUser api (개인 post 내용 확인) 의 useInfiniteQuery hooks
 *
 * @param nickname 개인 post 내용 확인할 유저의 nickname
 * @returns findPostsByUser api (개인 post 내용 확인) 의 useInfiniteQuery return 값
 */
export const useFindPostsByUser = (nickname: string) => {
  return useInfiniteQuery({
    ...userQueries.name(nickname)._ctx.posts(),
    enabled: Boolean(nickname),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * getPublicUser api (개인 정보 확인) 의 useQuery hooks
 *
 * @param nickname 개인 상세 정보 확인할 유저의 nickname
 * @returns getPublicUser api (개인 정보 확인) 의 useQuery return 값
 */
export const useGetPublicUser = (nickname: string) => {
  return useQuery({
    ...userQueries.name(nickname),
    enabled: Boolean(nickname),
  });
};

/**
 * modifyUser api (회원 정보 수정) 의 useMutation hooks
 *
 * @returns modifyUser api (회원 정보 수정) 의 useMutation return 값
 */
export const useModifyUser = () => {
  const queryClient = useQueryClient();
  return useMutation(modifyUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.me());
    },
  });
};

/**
 * retrieveMe api (내 정보 확인) 의 useQuery hooks
 *
 * @returns retrieveMe api (회원 정보 조회) 의 useQuery return 값
 */
export const useRetrieveMe = () => {
  return useQuery(userQueries.me());
};

/**
 * searchUser api (회원 검색) 의 useQuery hooks
 *
 * @param name 회원 검색 할 유저의 name
 * @returns searchUser api (회원 검색) 의 useQuery return 값
 */
export const useSearchUser = (name: string) => {
  return useQuery({
    ...userQueries.search(name),
    enabled: Boolean(name),
  });
};
