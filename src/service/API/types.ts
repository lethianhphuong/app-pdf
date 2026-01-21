import { z } from 'zod';

export const BaseRequest_Schema = z
  .object({
    page: z.number().optional(),
    size: z.number().optional()
  })
  .catchall(z.any());

interface Page<T> {
  list: T[];
  content: T[];
  total: number;
  totalPage: number;
  currentPage: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
}

export interface BaseResponse<T> {
  [key: string]: any;
  data: T;
  messageCode: string;
  message?: string;
}

export interface PageResponse<T> extends Omit<BaseResponse<T>, 'data'> {
  data: Page<T>;
}

//#region Qtud
export interface ApiResponseQtud<T> {
  data: {
    list: T;
    total: number;
  };
  message: string;
  messageCode: string;
}
//#endregion

//#region Dths
export interface ApiResponseDths<T> {
  code: string;
  data: T;
  message: string;
  success: boolean;
}

export interface DthsListResponse<T> {
  code: string;
  data: T[];
  message: string;
  success: boolean;
}

export interface DthsPageResponse<T> {
  success: boolean;
  message: string;
  code: string;
  data: Page<T>;
}

export interface DthsResponse<T> {
  success: boolean;
  message: string;
  code: string;
  data: T;
}
//#endregion

export interface PageParams {
  page: number;
  size: number;
}

export interface SearchListQueryParams extends PageParams {
  tuKhoaTimKiem?: string;
  sort?: string[];
  ngayLapTuNgay?: string;
  ngayLapDenNgay?: string;
  ngayDangKyTuNgay?: string;
  ngayDangKyDenNgay?: string;
  ngayTiepNhanTuNgay?: string;
  ngayTiepNhanDenNgay?: string;
  isQuanLyTrucTiep?: boolean;
  listPhoiHopChuTri?: boolean;
}
//#endregion
