import { BaseResponse, PageResponse } from '../types';
import {
  PhanCongXuLyParams,
  TaoTaiLieuParams,
  TraoDoiThongTin,
  TraoDoiThongTinExportParams,
  TraoDoiThongTinsParams
} from './types';
import { webHttp } from '@/service';

export type { TraoDoiThongTin, TraoDoiThongTinExportParams, PhanCongXuLyParams };
export const createTaiLieuTraoDoi = (body: TaoTaiLieuParams) => {
  return webHttp.post<BaseResponse<Pick<TraoDoiThongTin, 'idBieuMau'>>>({
    url: `/trao-doi-thong-tin/bieu-mau-di`,
    data: body
  });
};

export const phanCongXuLy = (body: PhanCongXuLyParams) => {
  return webHttp.post<BaseResponse<Pick<TraoDoiThongTin, 'idBieuMau'>>>({
    url: `/trao-doi-thong-tin/phan-cong-xu-ly`,
    data: body
  });
};

export const getdanhSachTraoDoiThongTinGui = (params: TraoDoiThongTinsParams) => {
  return webHttp.get<PageResponse<TraoDoiThongTin>>({ url: `/trao-doi-thong-tin/ds-gui`, params });
};

export const getdanhSachTraoDoiThongTinNhan = (params: TraoDoiThongTinsParams) => {
  return webHttp.get<PageResponse<TraoDoiThongTin>>({ url: `/trao-doi-thong-tin/ds-nhan`, params });
};

export const getdanhSachTraoDoiThongTinNhanDenHanTraLoi = () => {
  return webHttp.get<BaseResponse<TraoDoiThongTin[]>>(
    {
      url: `/trao-doi-thong-tin/ds-nhan-den-han-tra-loi`
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const deleteThongTinTraoDoi = (idBieuMau: string) => {
  return webHttp.delete<BaseResponse<string>>({
    url: `/trao-doi-thong-tin/${idBieuMau}`
  });
};

export const exportThongTinGui = (params: TraoDoiThongTinExportParams) => {
  return webHttp.downloadFile({
    url: `/trao-doi-thong-tin/thong-tin-gui/export/${params.exportType}`,
    params
  });
};

export const exportThongTinPhanHoi = (params: TraoDoiThongTinExportParams) => {
  return webHttp.downloadFile({
    url: `/trao-doi-thong-tin/thong-tin-phan-hoi/export/${params.exportType}`,
    params
  });
};

export const getDetailThongTinGui = (idBieuMau: string) => {
  return webHttp.get<BaseResponse<TraoDoiThongTin>>({
    url: `/trao-doi-thong-tin/thong-tin-gui/getDetail/${idBieuMau}`
  });
};

export const getDetailThongTinNhan = (idTraoDoiThongTin: string) => {
  return webHttp.get<BaseResponse<TraoDoiThongTin>>({
    url: `/trao-doi-thong-tin/thong-tin-nhan/getDetail/${idTraoDoiThongTin}`
  });
};

export const getDetailThongTinNhanByIdTaiLieu = (idTaiLieu: string) => {
  return webHttp.get<BaseResponse<TraoDoiThongTin>>({
    url: `/trao-doi-thong-tin/thong-tin-nhan/getDetail?idBieuMau=${idTaiLieu}`
  });
};
