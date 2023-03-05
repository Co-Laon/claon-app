import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewCreateRequest } from 'climbingweb/types/request/center';

const initialState: ReviewCreateRequest = {
  content: '',
  rank: 0,
};

const centerReview = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReview(state, actions: PayloadAction<ReviewCreateRequest>) {
      state.content = actions.payload.content;
      state.rank = actions.payload.rank;
    },
    initReview(state) {
      state.content = '';
      state.rank = 0;
    },
  },
});
export default centerReview.reducer;

export const { setReview, initReview } = centerReview.actions;
