import { BaseResponse, DthsPageResponse, DthsResponse } from '../types';
import { DsVuAnRequest, VuAnResponse } from './types';
import { dthsHttp } from '@/service';

export const getListVuAn = ({ page = 1, size = 99, ...rest }: DsVuAnRequest) => {
  return dthsHttp.get<DthsPageResponse<VuAnResponse>>({
    url: '/vu-an',
    params: { page, size, ...rest }
  });
};

export const createVuAn = (data: string) => {
  return dthsHttp.post<BaseResponse<string>>({ url: `/truy-xet/add`, data: data });
};

export const updateVuAn = (idHoSo: string, data: string) => {
  return dthsHttp.put<BaseResponse<string>>({ url: `/truy-xet/update/${idHoSo}`, data: data });
};

export const getDetailVuAn = (id: string) => {
  return dthsHttp.get<DthsResponse<VuAnResponse>>({ url: `/vu-an/${id}` });
};

export const deleteVuAn = (idHoSo: string) => {
  return dthsHttp.get<BaseResponse<string>>({ url: `/truy-xet/delete/${idHoSo}` });
};
