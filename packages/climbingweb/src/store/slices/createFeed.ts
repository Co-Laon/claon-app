import { PostDetailRequest } from './../../../types/request/post/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostImage {
  file: File | null;
  thumbNail: string;
  active: boolean;
}

const defaultPostImageList: PostImage[] = [];

const defaultPostData: PostDetailRequest = {
  centerId: '',
  climbingHistories: [
    {
      climbingCount: 0,
      holdId: '',
    },
  ],
  content: '',
  contentsList: [
    {
      url: '',
    },
  ],
  postId: '',
  centerName: '',
};

const initialState = {
  postImageList: defaultPostImageList,
  postData: defaultPostData,
};

const createPostSlice = createSlice({
  name: 'createFeed',
  initialState,
  reducers: {
    setReduxPostData(state, action: PayloadAction<PostDetailRequest>) {
      state.postData = action.payload;
    },
    addReduxPostImage(state, action: PayloadAction<PostImage>) {
      state.postImageList.push(action.payload);
    },
    deleteReduxPostImageList(state, action: PayloadAction<number>) {
      state.postImageList = state.postImageList.filter(
        ({}, idx) => action.payload !== idx
      );
    },
    initReduxPost(state) {
      state.postData = defaultPostData;
      state.postImageList = defaultPostImageList;
    },
  },
});

export default createPostSlice.reducer;
export const {
  setReduxPostData,
  addReduxPostImage,
  deleteReduxPostImageList,
  initReduxPost,
} = createPostSlice.actions;
