import { createSlice } from '@reduxjs/toolkit';

interface BnBState {
  visible: boolean;
}

const initialState: BnBState = {
  visible: true,
};

const manageBnb = createSlice({
  name: 'bnb',
  initialState,
  reducers: {   
    showBottomNavBar(state) {
      state.visible = true;
    },
    hideBottomNavBar(state) {
      state.visible = false;
    },
  },
});


export default manageBnb.reducer;
export const { showBottomNavBar, hideBottomNavBar } = manageBnb.actions;
