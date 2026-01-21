import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { DanhMucState } from './types';
import { SESSION_STORAGE } from '@/constants';
import { DanhMucEnums } from '@/constants/business/enums';
import { DanhMucApi } from '@/service/API';
import { RootState } from '@/store';
import { DANH_MUC_MANAGER } from '@/store/config';
import { isArray, isObject } from '@/utilities/typeof';

const _getCurrentState = (
  currentConfig: GetThunkAPI<AsyncThunkConfig>,
  danhMucKey: DanhMucEnums
): { hasData: boolean; data?: any[] } => {
  const state = currentConfig.getState() as RootState;
  const danhMucManagerInRedux = state[DANH_MUC_MANAGER] as DanhMucState;

  const danhMucInRedux = danhMucManagerInRedux[danhMucKey];
  if (danhMucInRedux.hasData) {
    return danhMucInRedux;
  }

  const danhMucManagerSessionJson = sessionStorage.getItem(SESSION_STORAGE.DANH_MUC);
  const hasDanhMucManagerInSession = danhMucManagerSessionJson && isObject(JSON.parse(danhMucManagerSessionJson));
  if (hasDanhMucManagerInSession) {
    const danhMucInSession = JSON.parse(danhMucManagerSessionJson)?.[danhMucKey];
    const isValidDataDanhMuc = isArray(danhMucInSession);

    if (isValidDataDanhMuc) {
      return {
        hasData: true,
        data: danhMucInSession
      };
    }
  }

  return {
    hasData: false,
    data: undefined
  };
};

export const getDanhMucThanhPho = createAsyncThunk('danh-muc/thanh-pho', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.ThanhPho);

  if (hasData) {
    return { data: { list: data } };
  }
  return DanhMucApi.getDanhMucThanhPho();
});

export const getDanhMucGioiTinh = createAsyncThunk('danh-muc/gioi-tinh', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.GioiTinh);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucGioiTinh();
});

export const getDanhMucQuocTich = createAsyncThunk('danh-muc/quoc-tich', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.QuocTich);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucQuocTich();
});

export const getDanhMucDanToc = createAsyncThunk('danh-muc/dan-toc', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.DanToc);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucDanToc();
});

export const getDanhMucTonGiao = createAsyncThunk('danh-muc/ton-giao', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.TonGiao);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucTonGiao();
});

export const getDanhMucNgheNghiep = createAsyncThunk('danh-muc/nghe-nghiep', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.NgheNghiep);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucNgheNghiep();
});

export const getDanhMucCapBac = createAsyncThunk('danh-muc/cap-bac', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.CapBac);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucCapBac();
});

export const getDanhMucChucVu = createAsyncThunk('danh-muc/chuc-vu', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.ChucVu);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucChucVu();
});

export const getDanhMucTrinhDoVanHoa = createAsyncThunk('danh-muc/trinh-do-van-hoa', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.TrinhDoVanHoa);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucTrinhDoVanHoa();
});

export const getDanhMucThanhPhanGiaDinh = createAsyncThunk('danh-muc/thanh-phan-gia-dinh', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.ThanhPhanGiaDinh);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucThanhPhanGiaDinh();
});
export const getDanhMucPhanLoaiDangVien = createAsyncThunk('danh-muc/phan-loai-dang-vien', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.PhanLoaiDangVien);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucPhanLoaiDangVien();
});

//#region Dths
export const getDanhMucDthsDonViTiepNhan = createAsyncThunk(
  'danh-muc/dths-don-vi-tiep-nhan',
  async (params: { maDonVi?: string }, thunkApi) => {
    const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.DthsDonViTiepNhan);

    if (hasData) {
      return { data };
    }

    return DanhMucApi.getDanhMucDthsDonViTiepNhan(params);
  }
);

export const getDanhMucDthsNguonKhoiTo = createAsyncThunk('danh-muc/dths-nguon-khoi-to', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.DthsNguonKhoiTo);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucDthsNguonKhoiTo();
});

export const getDanhMucDthsNguonKhoiToTuCTNV = createAsyncThunk(
  'danh-muc/dths-nguon-khoi-to-tu-ctnv',
  async (_, thunkApi) => {
    const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.DthsNguonKhoiToTuCTNV);

    if (hasData) {
      return { data: { list: data } };
    }

    return DanhMucApi.getDanhMucDthsNguonKhoiToTuCTNV();
  }
);
//#endregion

export const getDanhMucLoaiTuyenDuong = createAsyncThunk('danh-muc/loai-tuyen-duong', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.LoaiTuyenDuong);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucLoaiTuyenDuong();
});

export const getDanhMucDiaBan = createAsyncThunk('danh-muc/dia-ban', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.DiaBan);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucDiaBan();
});

export const getDanhMucLoaiDiaBan = createAsyncThunk('danh-muc/loai-dia-ban', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.LoaiDiaBan);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucLoaiDiaBan();
});

export const getDanhMucLoaiDiaBanDacTrung = createAsyncThunk('danh-muc/loai-dia-ban-dac-trung', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.LoaiDiaBanDacTrung);

  if (hasData) {
    return { data: { list: data } };
  }

  return DanhMucApi.getDanhMucLoaiDiaBanDacTrung();
});
