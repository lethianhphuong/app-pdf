import { DonVi } from '../don-vi';
import { BaseResponse, DthsListResponse, PageResponse } from '../types';
import { fetchers } from './map';
import {
  ChiTietDiaDiem,
  DanhMucAPIMap,
  DanhMucCapBac,
  DanhMucChucVu,
  DanhMucDanToc,
  DanhMucDiaDiem,
  DanhMucDthsDonViTiepNhan,
  DanhMucDthsNguonKhoiTo,
  DanhMucGioiTinh,
  DanhMucMap,
  DanhMucNgheNghiep,
  DanhMucPhanLoaiDangVien,
  DanhMucQtud,
  DanhMucQuocTich,
  DanhMucThanhPhanGiaDinh,
  DanhMucTonGiao,
  DanhMucTrinhDoVanHoa,
  DanhMucType
} from './types';
import { DanhMucStatus, LoaiDiaDiem } from '@/constants/business/enums';
import { danhMucHttp, dthsHttp, webHttpUrlBase } from '@/service';

export type {
  DanhMucQtud,
  DanhMucDanToc,
  DanhMucDiaDiem,
  DanhMucGioiTinh,
  DanhMucNgheNghiep,
  DanhMucQuocTich,
  DanhMucTonGiao,
  DonVi,
  DanhMucCapBac,
  DanhMucChucVu,
  DanhMucDthsDonViTiepNhan,
  DanhMucDthsNguonKhoiTo
};

//#region useDanhMucQuery
export const fetchDanhMuc = async <T extends DanhMucType>(
  type: T,
  url: string,
  params?: Record<string, any>
): Promise<DanhMucMap[T]> => {
  const res = await webHttpUrlBase.get<DanhMucAPIMap[T]>({ url, params });
  return fetchers[type] && fetchers[type](type, res);
};
//#endregion

export const getDanhMucQuery = (url: string, params?: any) => {
  return webHttpUrlBase.get<PageResponse<any>>({ url: url, params });
};

export const getDanhMucDiaDiem = (params?: any) => {
  return danhMucHttp.get<PageResponse<DanhMucDiaDiem>>({ url: '/api/v1/area-administrative', params });
};

export const getDanhMucThanhPho = () => {
  return getDanhMucDiaDiem({
    areaAdministrativeType: LoaiDiaDiem.ThanhPho,
    status: DanhMucStatus.Enabled,
    page: 0,
    size: 999
  });
};

export const getDanhMucQuanHuyen = async (maThanhPho?: any) => {
  return getDanhMucDiaDiem({
    // areaAdministrativeType: LoaiDiaDiem.QuanHuyen,
    status: DanhMucStatus.Enabled,
    provinceCode: maThanhPho,
    page: 0,
    size: 999
  });
};

export const getDanhMucXaPhuong = async (maQuanHuyen?: string) => {
  return getDanhMucDiaDiem({
    // areaAdministrativeType: LoaiDiaDiem.XaPhuong,
    status: DanhMucStatus.Enabled,
    districtCode: maQuanHuyen,
    page: 0,
    size: 999
  });
};

export const searchDanhMucDiaDiem = (key: string) => {
  return danhMucHttp.post<BaseResponse<ChiTietDiaDiem[]>>(
    { url: '/api/v1/area-administrative/text', params: { keySearch: key, status: DanhMucStatus.Enabled } },
    { errorMessageMode: 'none' }
  );
};

export const getDanhMucGioiTinh = () => {
  return danhMucHttp.get<PageResponse<DanhMucGioiTinh>>({
    url: '/api/v1/gender/list',
    params: { status: DanhMucStatus.Enabled }
  });
};

export const getDanhMucQuocTich = () => {
  return danhMucHttp.get<PageResponse<DanhMucQuocTich>>({
    url: '/api/v1/country/list',
    params: { status: DanhMucStatus.Enabled, size: 999 }
  });
};

export const getDanhMucDanToc = () => {
  return danhMucHttp.get<PageResponse<DanhMucDanToc>>({
    url: '/api/v1/nation/list',
    params: { status: DanhMucStatus.Enabled, size: 999 }
  });
};

export const getDanhMucTonGiao = () => {
  return danhMucHttp.get<PageResponse<DanhMucTonGiao>>({
    url: '/api/v1/religion/list',
    params: { status: DanhMucStatus.Enabled, size: 999 }
  });
};

export const getDanhMucNgheNghiep = () => {
  return danhMucHttp.get<PageResponse<DanhMucNgheNghiep>>({
    url: '/api/v1/job/list',
    params: { status: DanhMucStatus.Enabled, size: 999 }
  });
};

export const getDanhMucCapBac = () => {
  return danhMucHttp.get<PageResponse<DanhMucCapBac>>({
    url: '/api/v1/rank/list',
    params: { page: 0, size: 999, status: DanhMucStatus.Enabled }
  });
};

export const getDanhMucChucVu = () => {
  return danhMucHttp.get<PageResponse<DanhMucChucVu>>({
    url: '/api/v1/position',
    params: { page: 0, size: 999, status: DanhMucStatus.Enabled }
  });
};

export const getDanhMucTrinhDoVanHoa = () => {
  return danhMucHttp.get<PageResponse<DanhMucTrinhDoVanHoa>>({
    url: '/api/v1/education-qualification/list',
    params: { page: 0, size: 999, status: DanhMucStatus.Enabled }
  });
};

export const getDanhMucThanhPhanGiaDinh = () => {
  return danhMucHttp.get<PageResponse<DanhMucThanhPhanGiaDinh>>({
    url: '/api/v1/family-member/list',
    params: { page: 0, size: 999, status: DanhMucStatus.Enabled }
  });
};

export const getDanhMucPhanLoaiDangVien = () => {
  return danhMucHttp.get<PageResponse<DanhMucPhanLoaiDangVien>>({
    url: '/api/v1/classify-of-membership/list',
    params: { page: 0, size: 999, status: DanhMucStatus.Enabled }
  });
};

//#region Dths
export const getDanhMucDthsDonViTiepNhan = (params: { maDonVi?: string }) => {
  return dthsHttp.get<DthsListResponse<DanhMucDthsDonViTiepNhan>>({
    url: '/don-vi/chuyen-don-vi-thu-ly/' + params.maDonVi
  });
};

export const getDanhMucDthsNguonKhoiTo = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucDthsNguonKhoiTo>>({
    url: 'api/v1/news-source/list'
  });
};

export const getDanhMucDthsNguonKhoiToTuCTNV = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucDthsNguonKhoiTo>>({
    url: 'api/v1/news-source/list?classify=002&parentCode=012'
  });
};
//#endregion

export const getDanhMucLoaiTuyenDuong = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucQtud>>({
    url: 'api/v1/round/list'
  });
};

export const getDanhMucDiaBan = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucQtud>>({
    url: 'api/v1/ground/list'
  });
};

export const getDanhMucLoaiDiaBan = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucQtud>>({
    url: 'api/v1/type-of-location/list'
  });
};

export const getDanhMucLoaiDiaBanDacTrung = () => {
  return danhMucHttp.get<DthsListResponse<DanhMucQtud>>({
    url: 'api/v1/ground-properties/list'
  });
};
