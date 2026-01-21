import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Role, UserConfig } from '@/service/API/user/types';

export interface UserInfo {
  fullName: string;
  [key: string]: any; // Allow for additional properties
}

export interface UserState {
  userInfo?: UserInfo;
  userConfig?: UserConfig;
  userRoles?: Role[];

  setUserData: (e: Partial<UserState>) => void;
}

const store = immer<UserState>((set) => ({
  setUserData: (e) => set(e)
}));

const useUserStore = create(persist(devtools(store), { name: 'userStore' }));

export default useUserStore;
