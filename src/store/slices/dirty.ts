import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { DIRTY_MANAGER } from '../config';

export interface DirtyState {
  isDirty: boolean;
}

const initialState: DirtyState = {
  isDirty: false
};

export const dirtySlice = createSlice({
  name: DIRTY_MANAGER,
  initialState: initialState,
  reducers: {
    setDirtyState(state, action) {
      state.isDirty = action.payload;
    }
  }
});

export const dirtyStore = (state: RootState) => state[DIRTY_MANAGER];
export const { setDirtyState } = dirtySlice.actions;
export default dirtySlice.reducer;
