import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface LoadingState {
  loading?: boolean;
  startLoading: () => void;
  stopLoading: () => void;

  authLoading?: boolean;
  startAuthLoading: () => void;
  stopAuthLoading: () => void;
}

const store = immer<LoadingState>((set) => ({
  loading: false,
  authLoading: false,
  startLoading: () => {
    set((e) => {
      e.loading = true;
    });
  },
  stopLoading: () => {
    set((e) => {
      e.loading = false;
    });
  },
  startAuthLoading: () => {
    set((e) => {
      e.authLoading = true;
    });
  },
  stopAuthLoading: () => {
    set((e) => {
      e.authLoading = false;
    });
  }
}));

const useUserStore = create(devtools(store));

export default useUserStore;
