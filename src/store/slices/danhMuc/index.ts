import { createSlice } from '@reduxjs/toolkit';
import { DANH_MUC_MANAGER } from '../../config';
import {
  getDanhMucCapBac,
  getDanhMucChucVu,
  getDanhMucDanToc,
  getDanhMucDiaBan,
  getDanhMucDthsDonViTiepNhan,
  getDanhMucDthsNguonKhoiTo,
  getDanhMucDthsNguonKhoiToTuCTNV,
  getDanhMucGioiTinh,
  getDanhMucLoaiDiaBan,
  getDanhMucLoaiDiaBanDacTrung,
  getDanhMucLoaiTuyenDuong,
  getDanhMucNgheNghiep,
  getDanhMucPhanLoaiDangVien,
  getDanhMucQuocTich,
  getDanhMucThanhPhanGiaDinh,
  getDanhMucThanhPho,
  getDanhMucTonGiao,
  getDanhMucTrinhDoVanHoa
} from './services';
import { DanhMucState } from './types';
import { DanhMucEnums, LoaiNguonKhoiToEnums, SESSION_STORAGE } from '@/constants';
import { DanhMucApi } from '@/service/API';
import { DthsListResponse, PageResponse } from '@/service/API/types';
import { RootState } from '@/store';
import { isObject } from '@/utilities/typeof';

const initialState: DanhMucState = {
  [DanhMucEnums.ThanhPho]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.GioiTinh]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.QuocTich]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.DanToc]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.TonGiao]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.NgheNghiep]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.CapBac]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.ChucVu]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.DthsDonViTiepNhan]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.DthsNguonKhoiTo]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.DthsNguonKhoiToTuCTNV]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.LoaiTuyenDuong]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.DiaBan]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.LoaiDiaBan]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.LoaiDiaBanDacTrung]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.TrinhDoVanHoa]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.ThanhPhanGiaDinh]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.PhanLoaiDangVien]: {
    hasData: false,
    data: []
  }
};

export const danhMucSlice = createSlice({
  name: DANH_MUC_MANAGER,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDanhMucQuocTich.fulfilled, (state, action) => {
      const danhMucQuocTich = (action.payload as PageResponse<DanhMucApi.DanhMucQuocTich>).data.list;
      state[DanhMucEnums.QuocTich].data = danhMucQuocTich;
      state[DanhMucEnums.QuocTich].hasData = true;
      updateDanhMucSession(DanhMucEnums.QuocTich, danhMucQuocTich);
    });
    builder.addCase(getDanhMucDanToc.fulfilled, (state, action) => {
      const danhMucDanToc = (action.payload as PageResponse<DanhMucApi.DanhMucDanToc>).data.list;
      state[DanhMucEnums.DanToc].data = danhMucDanToc;
      state[DanhMucEnums.DanToc].hasData = true;
      updateDanhMucSession(DanhMucEnums.DanToc, danhMucDanToc);
    });
    builder.addCase(getDanhMucGioiTinh.fulfilled, (state, action) => {
      const danhMucGioiTinh = (action.payload as PageResponse<DanhMucApi.DanhMucGioiTinh>).data.list;
      state[DanhMucEnums.GioiTinh].data = danhMucGioiTinh;
      state[DanhMucEnums.GioiTinh].hasData = true;
      updateDanhMucSession(DanhMucEnums.GioiTinh, danhMucGioiTinh);
    });
    builder.addCase(getDanhMucNgheNghiep.fulfilled, (state, action) => {
      const danhMucNgheNghiep = (action.payload as PageResponse<DanhMucApi.DanhMucNgheNghiep>).data.list;
      state[DanhMucEnums.NgheNghiep].data = danhMucNgheNghiep;
      state[DanhMucEnums.NgheNghiep].hasData = true;
      updateDanhMucSession(DanhMucEnums.NgheNghiep, danhMucNgheNghiep);
    });

    builder.addCase(getDanhMucThanhPho.fulfilled, (state, action) => {
      const danhMucThanhPho = (action.payload as PageResponse<DanhMucApi.DanhMucDiaDiem>).data.list;
      state[DanhMucEnums.ThanhPho].data = danhMucThanhPho;
      state[DanhMucEnums.ThanhPho].hasData = true;
      updateDanhMucSession(DanhMucEnums.ThanhPho, danhMucThanhPho);
    });
    builder.addCase(getDanhMucTonGiao.fulfilled, (state, action) => {
      const danhMucTonGiao = (action.payload as PageResponse<DanhMucApi.DanhMucTonGiao>).data.list;
      state[DanhMucEnums.TonGiao].data = danhMucTonGiao;
      state[DanhMucEnums.TonGiao].hasData = true;
      updateDanhMucSession(DanhMucEnums.TonGiao, danhMucTonGiao);
    });
    builder.addCase(getDanhMucCapBac.fulfilled, (state, action) => {
      const danhMucCapBac = (action.payload as PageResponse<DanhMucApi.DanhMucCapBac>).data.list;
      state[DanhMucEnums.CapBac].data = danhMucCapBac;
      state[DanhMucEnums.CapBac].hasData = true;
      updateDanhMucSession(DanhMucEnums.CapBac, danhMucCapBac);
    });
    builder.addCase(getDanhMucChucVu.fulfilled, (state, action) => {
      const danhMucChucVu = (action.payload as PageResponse<DanhMucApi.DanhMucChucVu>).data.list;
      state[DanhMucEnums.ChucVu].data = danhMucChucVu;
      state[DanhMucEnums.ChucVu].hasData = true;
      updateDanhMucSession(DanhMucEnums.ChucVu, danhMucChucVu);
    });
    builder.addCase(getDanhMucDthsDonViTiepNhan.fulfilled, (state, action) => {
      const value = (action.payload as DthsListResponse<DanhMucApi.DanhMucDthsDonViTiepNhan>).data;
      state[DanhMucEnums.DthsDonViTiepNhan].data = value;
      state[DanhMucEnums.DthsDonViTiepNhan].hasData = true;
      updateDanhMucSession(DanhMucEnums.DthsDonViTiepNhan, value);
    });
    builder.addCase(getDanhMucDthsNguonKhoiTo.fulfilled, (state, action) => {
      let value = (action.payload as PageResponse<DanhMucApi.DanhMucDthsNguonKhoiTo>).data.list;

      //#region Filter - Chỉ lấy giá trị có trong enum
      if (value?.length > 0) {
        const arrNguonKhoiTo = Object.values(LoaiNguonKhoiToEnums);
        value = value.filter((e) => arrNguonKhoiTo.includes(e?.code as LoaiNguonKhoiToEnums));
      }
      //#endregion

      state[DanhMucEnums.DthsNguonKhoiTo].data = value;
      state[DanhMucEnums.DthsNguonKhoiTo].hasData = true;
      updateDanhMucSession(DanhMucEnums.DthsNguonKhoiTo, value);
    });
    builder.addCase(getDanhMucDthsNguonKhoiToTuCTNV.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucDthsNguonKhoiTo>).data.list;
      state[DanhMucEnums.DthsNguonKhoiToTuCTNV].data = value;
      state[DanhMucEnums.DthsNguonKhoiToTuCTNV].hasData = true;
      updateDanhMucSession(DanhMucEnums.DthsNguonKhoiToTuCTNV, value);
    });
    builder.addCase(getDanhMucLoaiTuyenDuong.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.LoaiTuyenDuong;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucDiaBan.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.DiaBan;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucLoaiDiaBan.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.LoaiDiaBan;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucLoaiDiaBanDacTrung.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.LoaiDiaBanDacTrung;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucTrinhDoVanHoa.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.TrinhDoVanHoa;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucThanhPhanGiaDinh.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.ThanhPhanGiaDinh;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
    builder.addCase(getDanhMucPhanLoaiDangVien.fulfilled, (state, action) => {
      const value = (action.payload as PageResponse<DanhMucApi.DanhMucQtud>).data.list;
      const danhMucEnums = DanhMucEnums.PhanLoaiDangVien;
      state[danhMucEnums].data = value;
      state[danhMucEnums].hasData = true;
      updateDanhMucSession(danhMucEnums, value);
    });
  }
});

function updateDanhMucSession(danhMucKey: DanhMucEnums, value?: any[]) {
  const danhMucSessionJson = sessionStorage.getItem(SESSION_STORAGE.DANH_MUC);
  const danhMucObjInSession = danhMucSessionJson ? JSON.parse(danhMucSessionJson) : {};
  const isValidDanhMucObj = isObject(danhMucObjInSession);
  if (!isValidDanhMucObj) return;

  const hasDataInDanhMuc = !!danhMucObjInSession?.[danhMucKey];
  if (hasDataInDanhMuc) return;

  danhMucObjInSession[danhMucKey] = value;
  sessionStorage.setItem(SESSION_STORAGE.DANH_MUC, JSON.stringify(danhMucObjInSession));
}

export const danhMucStore = (state: RootState) => state[DANH_MUC_MANAGER];

export default danhMucSlice.reducer;
