import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Instagram {
  instagramOAuthId?: string;
  instagramUserName?: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User extends Instagram, Token {
  armReach: string;
  height: string;
  imagePath: string;
  nickname: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { authorize } = authSlice.actions;
