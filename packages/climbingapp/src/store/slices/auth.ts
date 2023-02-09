import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getData } from 'climbingapp/src/utils/storage';

export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface User extends Token {
  isCompletedSignUp: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

export const getTokenFromStorage = createAsyncThunk(
  'auth/getTokenToStorage',
  async () => {
    const accessToken = await getData('access-token');
    const refreshToken = await getData('refresh-token');
    const isCompletedSignUp = await getData('isCompletedSignUp');

    return {
      accessToken,
      refreshToken,
      isCompletedSignUp,
    };
  }
);

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
  extraReducers: {
    [getTokenFromStorage.pending.type]: (state) => {
      state.loading = true;
    },
    [getTokenFromStorage.fulfilled.type]: (state, action) => {
      state.user = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isCompletedSignUp: action.payload.isCompletedSignUp,
      };
      state.loading = false;
    },
    [getTokenFromStorage.rejected.type]: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
export const { authorizeAction, logoutAction } = authSlice.actions;
