import { PageParams } from '../types';
import {
  DoKhanEnums,
  DoMat,
  FileTypeEnums,
  LoaiThongTinTraoDoiEnums,
  TrangThaiTrinhKyEnums
} from '@/constants/business/enums';

export interface TaoTaiLieuParams {
  tenDoMat: string;
  maDoMat: string;
  doKhan: string;
  tenDoKhan: string;
  dacDiem?: string;
  trichYeu: string;
}

export interface PhanCongXuLyParams {
  id?: string;
  idBieuMauGui?: string;
  usernameCbTraLoi?: string;
  idCbTraLoi?: string;
  tenCbTraLoi?: string;
  maChucVuCbTraLoi?: string;
  tenChucVuCbTraLoi?: string;
  maCapBacCbTraLoi?: string;
  tenCapBacCbTraLoi?: string;
  maDonViCbTraLoi?: string;
  tenDonViCbTraLoi?: string;
  hanTraLoi?: string;
  noiDung?: string;
}

export interface TraoDoiThongTinsParams extends PageParams {}
export interface TaiLieuTraoDoisParams {
  idBieuMau: string;
}
export interface TraoDoiThongTinExportParams {
  exportType: FileTypeEnums;
  params: TraoDoiThongTinsParams;
}
export interface TraoDoiThongTin {
  idBieuMau: string;
  tenCbTrinhKy: string;
  doKhan: DoKhanEnums;
  tenDoKhan: string;
  doMat: DoMat;
  tenDoMat: string;
  trangThai: TrangThaiTrinhKyEnums;
  tenTrangThai: string;
  idTraoDoiThongTin: string;
  idBieuMauGui?: string;
  ngayLapPhieu?: string;
  ngayTrinhKy?: string;
  donViNhan: string;
  maDonViNhanThongTin: string;
  canBoTrinhDuyet: string;
  lanhDaoPheDuyet: string;
  idCanBoXuLy?: string;
  userNameCanBoXuLy?: string;
  loaiThongTinTraoDoi: LoaiThongTinTraoDoiEnums;
  tenDonViGui: string;
  maDonViGui: string;
  chucVuCanBoXuLy?: string;
  maChucVuCanBoXuLy?: string;
  capBacCanBoXuLy?: string;
  maCapBacCanBoXuLy?: string;
  maDonViCbTraLoi?: string;
  tenDonViCbTraLoi?: string;
  hanNgayTraLoi?: string;
  noiDung?: string;
  ngayDen?: string;
}
