import { DthsPageResponse, DthsResponse } from '../types';
import { ConNguoi, DsConNguoiPrams, ThongTinConNguoi } from './types';
import { doiTuongHttp, traCuuNVCBHttp } from '@/service';

export const getListConNguoi = ({ page = 1, size = 99, ...rest }: DsConNguoiPrams) => {
  return doiTuongHttp.get<DthsPageResponse<ConNguoi>>({
    url: 'con-nguoi',
    params: { page, size, ...rest }
  });
};

export const getListConNguoiTraCuu = ({ page = 1, size = 99, ...rest }: DsConNguoiPrams) => {
  return traCuuNVCBHttp.get<DthsPageResponse<ConNguoi>>({
    url: 'con-nguoi',
    params: { page, size, ...rest }
  });
};

export const getChiTietConNguoi = (id: string) => {
  return doiTuongHttp.get<DthsResponse<ThongTinConNguoi>>({ url: `/con-nguoi/${id}` });
};
