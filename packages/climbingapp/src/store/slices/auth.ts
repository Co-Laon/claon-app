import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface User extends Token {
  isCompletedSignUp: boolean;
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
    authorizeAction(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logoutAction(state) {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { authorizeAction, logoutAction } = authSlice.actions;
