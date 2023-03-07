import { PostDetailRequest } from './../../../types/request/post/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostImage {
  file: File | null;
  thumbNail: string;
}

const defaultPostImageList: PostImage[] = [];

const defaultDeleteImageList: string[] = [];

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
  deleteQueue: defaultDeleteImageList,
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
    addReduxDeleteImage(state, action: PayloadAction<string>) {
      state.deleteQueue.push(action.payload);
    },
    deleteReduxPostImageList(state, action: PayloadAction<number>) {
      state.postImageList = state.postImageList.filter(
        ({}, idx) => action.payload !== idx
      );
    },
    initReduxPost(state) {
      state.postData = defaultPostData;
      state.postImageList = defaultPostImageList;
      state.deleteQueue = defaultDeleteImageList;
    },
  },
});

export default createPostSlice.reducer;
export const {
  setReduxPostData,
  addReduxPostImage,
  deleteReduxPostImageList,
  initReduxPost,
  addReduxDeleteImage,
} = createPostSlice.actions;
