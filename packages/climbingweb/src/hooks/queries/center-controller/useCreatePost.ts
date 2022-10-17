import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { PostData } from './../../../components/CreateFeed/type.d';

const createPost = async (postData: PostData) => {
  const { data } = await axios.post('/posts', postData);
  return data;
};

export const useCreatePost = (
  postData: PostData,
  options?: Omit<UseMutationOptions<any, unknown, void, unknown>, 'mutationFn'>
) => {
  return useMutation(() => createPost(postData), options);
};
