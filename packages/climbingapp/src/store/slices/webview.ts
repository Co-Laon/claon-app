import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface WebView {
  type: string;
  payload: string;
}

interface WebViewState {
  data: WebView;
}

const initialState: WebViewState = {
  data: { type: '', payload: 'flex' },
};

const webViewSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getWebViewState(state: WebViewState, action: PayloadAction<WebView>) {
      state.data = action.payload;
    },
  },
});

export default webViewSlice.reducer;
export const { getWebViewState } = webViewSlice.actions;
