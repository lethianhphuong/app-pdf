import { BaseResponse } from '../types';
import { BodyLoaiSuKien, BodySuKien, LoaiSuKien, ParamsSuKien, SuKien } from './types';
import { webHttp } from '@/service';

export type { BodyLoaiSuKien, BodySuKien, LoaiSuKien, SuKien, ParamsSuKien };

export const getDanhSachSuKien = (params: ParamsSuKien) => {
  return webHttp.get<BaseResponse<SuKien[]>>({ url: `/su-kien/danh-sach-su-kien`, params });
};

export const themSuKien = (data: BodySuKien) => {
  return webHttp.post<BaseResponse<string>>({
    url: `/su-kien/them-su-kien`,
    data: data
  });
};

export const chinhSuaSuKien = (id: string, data: BodySuKien) => {
  return webHttp.put<BaseResponse<string>>({
    url: `/su-kien/cap-nhat-su-kien/${id}`,
    data: data
  });
};

export const xoaSuKien = (id: string) => {
  return webHttp.delete<BaseResponse<string>>({ url: `/su-kien/xoa-su-kien/${id}` });
};

export const getDanhSachLoaiSuKien = () => {
  return webHttp.get<BaseResponse<LoaiSuKien[]>>({ url: `/su-kien/danh-sach-danh-muc-su-kien` });
};

export const themLoaiSuKien = (params: BodyLoaiSuKien) => {
  return webHttp.post<BaseResponse<string>>({
    url: `/su-kien/them-danh-muc-su-kien?tenSuKien=${params.tenSuKien}`
  });
};

export const chinhSuaLoaiSuKien = (id: string, data: BodyLoaiSuKien) => {
  return webHttp.put<BaseResponse<string>>({
    url: `/su-kien/cap-nhat-danh-muc-su-kien/${id}?tenSuKien=${data.tenSuKien}`
  });
};

export const xoaLoaiSuKien = (id: string) => {
  return webHttp.delete<BaseResponse<string>>({ url: `/su-kien/xoa-danh-muc-su-kien/${id}` });
};
