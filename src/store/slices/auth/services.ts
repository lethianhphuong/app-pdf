import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { UserState } from '.';
import { UserApi } from '@/service/API';
import { RootState } from '@/store';
import { AUTH_MANAGER } from '@/store/config';

const _getCurrentState = (currentConfig: GetThunkAPI<AsyncThunkConfig>) => {
  const state = currentConfig.getState() as RootState;
  return state[AUTH_MANAGER] as UserState;
};

export const getDanhSachNhomQuyen = createAsyncThunk('auth/nhom-quyen', async (_, thunkApi) => {
  const user = _getCurrentState(thunkApi);

  if (user?.nhomQuyen?.hasData) {
    return { data: { list: user?.nhomQuyen.data } };
  }

  return UserApi.getNhomQuyenCuaTaiKhoan();
});
