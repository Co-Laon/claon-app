import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface UserInfo {
  basicLocalActiveArea: string;
  imagePath: string;
  instagramOAuthId: string;
  instagramUserName: string;
  metropolitanActiveArea: string;
  nickname: string;
}

interface AuthInfoState {
  userInfo: UserInfo;
}

const initialState: AuthInfoState = {
  userInfo: {
    basicLocalActiveArea: '',
    imagePath: '',
    instagramOAuthId: '',
    instagramUserName: '',
    metropolitanActiveArea: '',
    nickname: '',
  },
};

const authInfoSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setBasicArea(state, action: PayloadAction<string>) {
      state.userInfo.basicLocalActiveArea = action.payload;
    },
    setMetroPolitanArea(state, action: PayloadAction<string>) {
      state.userInfo.metropolitanActiveArea = action.payload;
    },
    setNickName(state, action: PayloadAction<string>) {
      state.userInfo.nickname = action.payload;
    },
    setImagePath(state, action: PayloadAction<string>) {
      state.userInfo.imagePath = action.payload;
    },
  },
});

export default authInfoSlice.reducer;
export const { setBasicArea, setImagePath, setMetroPolitanArea, setNickName } =
  authInfoSlice.actions;
