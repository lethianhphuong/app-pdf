import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { TrangThaiTrinhKyEnums } from '@/constants/business/enums';
import { PageParams } from '@/service/API/types';

export interface CongViecCongTacNghiepVu {
  id: string;
  soDangKy: string;
  ngayDangKy: string;
  loaiHoSo: string;
  trichYeu: string;
  noiDungCongViec: string;
  trangThai: string;
  hanThucHien: string;
}

export interface FormSearchBox extends PageParams {
  tuKhoaTimKiem: string;
  trangThaiTrinhKy?: TrangThaiTrinhKyEnums;
  canBoTrinhKy?: DefaultOptionType[];
  ngayTrinhDuyet?: [dayjs.Dayjs, dayjs.Dayjs];
}

export interface BgImageBase64Obj {
  deXuat: string;
  hoSo: string;
  doiTuong: string;
  lucLuong: string;
}
