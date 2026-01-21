import { createSlice } from '@reduxjs/toolkit';
import { getDanhSachNhomQuyen } from './services';
import { HeLucLuongAnNinhEnums } from '@/constants/business/enums';
import { UserApi } from '@/service/API';
import { PageResponse } from '@/service/API/types';
import { AUTH_MANAGER } from '@/store/config';

export interface UserState {
  userInfo?: UserApi.UserInfo;
  chuKy?: string;
  config?: UserApi.UserConfig;
  heLucLuong?: HeLucLuongAnNinhEnums;
  danhSachLanhDao: {
    hasData: boolean;
    data: UserApi.LanhDao[];
  };
  nhomQuyen: {
    hasData: boolean;
    data: UserApi.Role[];
  };
}

const initialState: UserState = {
  userInfo: undefined,
  chuKy: undefined,
  config: undefined,
  danhSachLanhDao: {
    hasData: false,
    data: []
  },
  nhomQuyen: {
    hasData: false,
    data: []
  }
};

export const authSlice = createSlice({
  name: AUTH_MANAGER,
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload?.userInfo;
      state.chuKy = action.payload?.chuKy;
      state.heLucLuong = action.payload?.heLucLuong;
    },
    setUserConfig(state, action) {
      state.config = action.payload?.config;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDanhSachNhomQuyen.fulfilled, (state, action) => {
      state.nhomQuyen.data = (action.payload as PageResponse<UserApi.Role>)?.data?.list;
      state.nhomQuyen.hasData = true;
    });
  }
});

export const { setUserInfo, setUserConfig } = authSlice.actions;

export default authSlice.reducer;
