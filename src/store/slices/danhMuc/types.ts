import { DanhMucEnums } from '@/constants/business/enums';
import { DanhMucApi } from '@/service/API';

export interface DanhMucItem<T> {
  data: T[];
  hasData: boolean;
}

export interface DanhMucState {
  [DanhMucEnums.ThanhPho]: DanhMucItem<DanhMucApi.DanhMucDiaDiem>;
  [DanhMucEnums.GioiTinh]: DanhMucItem<DanhMucApi.DanhMucGioiTinh>;
  [DanhMucEnums.QuocTich]: DanhMucItem<DanhMucApi.DanhMucQuocTich>;
  [DanhMucEnums.DanToc]: DanhMucItem<DanhMucApi.DanhMucDanToc>;
  [DanhMucEnums.TonGiao]: DanhMucItem<DanhMucApi.DanhMucTonGiao>;
  [DanhMucEnums.NgheNghiep]: DanhMucItem<DanhMucApi.DanhMucNgheNghiep>;
  [DanhMucEnums.CapBac]: DanhMucItem<DanhMucApi.DanhMucCapBac>;
  [DanhMucEnums.ChucVu]: DanhMucItem<DanhMucApi.DanhMucChucVu>;
  [DanhMucEnums.DthsDonViTiepNhan]: DanhMucItem<DanhMucApi.DanhMucDthsDonViTiepNhan>;
  [DanhMucEnums.DthsNguonKhoiTo]: DanhMucItem<DanhMucApi.DanhMucDthsNguonKhoiTo>;
  [DanhMucEnums.DthsNguonKhoiToTuCTNV]: DanhMucItem<DanhMucApi.DanhMucDthsNguonKhoiTo>;
  [DanhMucEnums.LoaiTuyenDuong]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.DiaBan]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.LoaiDiaBan]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.LoaiDiaBanDacTrung]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.TrinhDoVanHoa]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.ThanhPhanGiaDinh]: DanhMucItem<DanhMucApi.DanhMucQtud>;
  [DanhMucEnums.PhanLoaiDangVien]: DanhMucItem<DanhMucApi.DanhMucQtud>;
}
