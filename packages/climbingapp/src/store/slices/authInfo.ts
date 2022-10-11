import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Instagram {
  instagramOAuthId?: string;
  instagramUserName?: string;
}

export interface UserInfo extends Instagram {
  armReach: string;
  height: string;
  imagePath: string;
  nickname: string;
}

interface AuthInfoState {
  userInfo: UserInfo;
}

const initialState: AuthInfoState = {
  userInfo: {
    armReach: '',
    height: '',
    imagePath: '',
    instagramOAuthId: '',
    instagramUserName: '',
    nickname: '',
  },
};

const authInfoSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setArmReach(state, action: PayloadAction<string>) {
      state.userInfo.armReach = action.payload;
    },
    setHeight(state, action: PayloadAction<string>) {
      state.userInfo.height = action.payload;
    },
    setInstagram(state, action: PayloadAction<Instagram>) {
      state.userInfo.instagramOAuthId = action.payload.instagramOAuthId;
      state.userInfo.instagramUserName = action.payload.instagramUserName;
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
export const {
  setArmReach,
  setHeight,
  setInstagram,
  setImagePath,
  setNickName,
} = authInfoSlice.actions;
