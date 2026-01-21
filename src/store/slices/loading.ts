import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LOADING_MANAGER } from '../config';

export interface LoadingState {
  loading: boolean;
  authLoading: boolean;
}

const initialState: LoadingState = {
  loading: false,
  authLoading: false
};

export const loadingSlice = createSlice({
  name: LOADING_MANAGER,
  initialState: initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    startAuthLoading(state) {
      state.authLoading = true;
    },
    stopAuthLoading(state) {
      state.authLoading = false;
    }
  }
});

export const loadingStore = (state: RootState) => state[LOADING_MANAGER];
export const { startLoading, stopLoading, startAuthLoading, stopAuthLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
