import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BtSheet {
  open: boolean;
  sheet?: React.ReactNode[] | React.ReactNode | null;
}

interface BtSheetState {
  btSheet: BtSheet;
}

const initialState: BtSheetState = {
  btSheet: {
    open: false,
    sheet: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openBTSheet(state) {
      state.btSheet.open = true;
    },
    closeBTSheet(state) {
      state.btSheet.open = false;
    },
    setSheet(
      state,
      action: PayloadAction<React.ReactNode[] | React.ReactNode | null>
    ) {
      state.btSheet.sheet = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { openBTSheet, closeBTSheet, setSheet } = uiSlice.actions;
