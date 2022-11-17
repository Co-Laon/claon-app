import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Instagram {
  instagramOAuthId?: string;
  instagramUserName?: string;
}
export interface Token {
  accessToken: string | number | boolean;
  refreshToken: string | number | boolean;
}

export interface User extends Instagram {
  armReach: string;
  height: string;
  imagePath: string;
  nickname: string;
}

interface AuthState {
  user: User | null;
  token: Token | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    getToken(state, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { getUser, getToken } = authSlice.actions;
