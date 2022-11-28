import { PostCreateRequest } from './../../../types/request/post/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostImage {
  file: File;
  thumbNail: string;
}

const defaultPostImageList: PostImage[] = [];

const defaultPostData: PostCreateRequest = {
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
};

const initialState = {
  postImageList: defaultPostImageList,
  postData: defaultPostData,
};

const createPostSlice = createSlice({
  name: 'createFeed',
  initialState,
  reducers: {
    setReduxPostData(state, action: PayloadAction<PostCreateRequest>) {
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
