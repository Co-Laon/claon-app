import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from 'react-native-image-picker';

export interface S3Util {
  profileImage?: Asset;
}

const initialState: S3Util = {};

const S3UtilSlice = createSlice({
  name: 'S3Util',
  initialState,
  reducers: {
    setProfileImageFile(state, action: PayloadAction<Asset>) {
      state.profileImage = action.payload;
    },
  },
});

export default S3UtilSlice.reducer;
export const { setProfileImageFile } = S3UtilSlice.actions;
