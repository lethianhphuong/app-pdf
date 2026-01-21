/**
 * Lưu các constants cho business/nghiệp vụ
 * Enum file - tên dùng PascalCase, giá trị chữ Hoa
 */

/**
 * Mẫu enum
 */
export enum UserSampleRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER'
}

export enum DoKhanEnums {
  Khan = '002',
  HoaToc = '003'
}

export enum DoMat {
  // TuyetMat = '001',
  ToiMat = '002',
  Mat = '003',
  KhongMat = '004'
}

export enum LoaiDiaDiem {
  ThanhPho = '001',
  QuanHuyen = '002',
  XaPhuong = '003'
}

export enum LoaiNguonKhoiToEnums {
  ToGiacVeToiPham = '010',
  TinBaoVeToiPham = '011',
  TinBaoVeCongTacNghiepVu = '012',
  TinBaoTrenThongTinDaiChung = '013',
  KienNghiKhoiTo = '014',
  CoQuanCoThamQuyen = '015',
  NguoiPhamToiTuThu = '016',
  NguonKhac = '999'
}
export enum HoSo {
  DieuTraCoBan = 'DTCB',
  DieuTraCoBanCanhSat = 'DX',
  QuanLyNghiepVu = 'QUAN_LY_NGHIEP_VU',
  KiemTraNghiepVu = 'KIEM_TRA_NGHIEP_VU',
  TinBanDau = 'TIN_BAN_DAU',
  TruyXet = 'TRUY_XET',
  TruyTim = 'TRUY_TIM',
  ChuyenAn = 'CHUYEN_AN',
  LucLuongBiMat = 'LUC_LUONG_BI_MAT',
  NhaAnToan = 'NHA_AN_TOAN',
  HopThuBiMat = 'HOP_THU_BI_MAT',
  VanDeNghiepVu = 'VAN_DE_NGHIEP_VU',
  TongHopDeXuat = 'TONG_HOP_DE_XUAT',
  DienBienHoSo = 'DIEN_BIEN_HO_SO',
  TraoDoiThongTin = 'TRAO_DOI_THONG_TIN',
  TraoDoiThongTinPhanHoi = 'TRAO_DOI_THONG_TIN_PHAN_HOI',
  DoiTuongConNguoi = 'DOI_TUONG_CON_NGUOI',
  TraCuuB5 = 'TRA_CUU_B5',
  DiemHenBiMat = 'DIEM_HEN_BI_MAT'
}

export enum NhiemVuLucLuongStatus {
  LuuMoi = '000',
  DangThucHien = '001',
  KetThuc = '002'
}

export enum DienBienStatus {
  LuuMoi = '0',
  ChoKySo = '1',
  HuyTrinhKy = '2',
  YeuCauBoSung = '3',
  TuChoi = '4',
  CbhsYeuCauBoSung = '5',
  CbhsTuChoi = '6',
  ChoDuyet = '7',
  DaDuyet = '8'
}

export enum BieuMau {
  A3A = 'A3A',
  B1 = 'B1',
  B3 = 'B3',
  B3Export = 'B3_EXPORT',
  B4 = 'B4',
  B4Export = 'B4_EXPORT',
  B5 = 'B5',
  B7A = 'B7A',
  B9 = 'B9',
  B11 = 'B11',
  B15 = 'B15',
  B20 = 'B20',
  DeCuongChiTietDieuTraCoBan = 'DE_CUONG_DTCB',
  DeCuongChiTietDieuTraVeNguoi = 'DE_CUONG_CHI_TIET_DT_VE_NGUOI',
  BaoCaoKetQuaDieuTraCoBanTheoDeCuongChiTiet = 'BC_DTCB_DE_CUONG',
  BaoCaoKetQuaDeCuongChiTietDieuTraVeNguoi = 'BC_KQ_DE_CUONG_CT_DT_VE_NGUOI',
  B19A = 'B19A',
  B19AExport = 'B19A_EXPORT',
  B27A = 'B27A',
  B27AExport = 'B27A_EXPORT',
  B24 = 'B24',
  KeHoachXuLyXacMinhTin = 'KH_XL_XMT',
  // B2 = 'BC_KQ_XL_XMT',
  B2 = 'B2',
  PhuongAnPhanGian = 'PA_PHAN_GIAN',
  KeHoachDamBaoAnNinh = 'KH_DAM_BAO_AN',
  B26 = 'B26',
  PA1 = 'PA1',
  PA2 = 'PA2',
  PA4 = 'PA4',
  PA5 = 'PA5',
  SoDo = 'SO_DO',
  BL7A = 'BL7A',
  BL2A = 'BL2A',
  BaoCaoKetQuaLienLac = 'BAO_CAO_KET_QUA_LIEN_LAC',
  KetQuaPhanLoai = 'KQ_PL',
  PA7 = 'PA7',
  PA8 = 'PA8',
  PA9 = 'PA9',
  PA12 = 'PA12',
  CacTaiLieuSaoTrichTuHoSoKhacChuyenDen = 'SAO_TRICH',
  BaoCaoDanhGiaDeXuatXuLyTin = 'BC_DANH_GIA_DE_XUAT_XLT',
  BaoCaoKetQuaXuLyTin = 'BC_KQ_XL_XMT',
  KeHoachKiemDanhKiemDien = 'KH_KIEM_DANH_KIEM_DIEN',
  BaoCaoKetQuaKiemDanhKiemDien = 'BC_KQ_KIEM_DANH_KIEM_DIEN',
  BaoCaoTongKetCongTacTruyXet = 'BC_TK_TX',
  KeHoach = 'KE_HOACH',
  BaoCao = 'BAO_CAO',
  DuKienLichSinhHoat = 'DK_LSH',
  CacTaiLieuKhac = 'KHAC',
  BQ1A = 'BQ1A',
  A2A = 'A2A',
  BQ2A = 'BQ2A',
  BQ3A = 'BQ3A',
  B18A = 'B18A',
  KetQuaB5 = 'KQ_B5',
  BaoCaoXacMinh = 'BAO_CAO_XAC_MINH',
  BaoCaoSoKetTongKetCongTacTruyXet = 'BC_SO_KET_TONG_KET_CT_TRUY_XET',
  TraoDoiThongTin = 'TRAO_DOI_THONG_TIN',
  TraoDoiThongTinPhanHoi = 'TRAO_DOI_THONG_TIN_PHAN_HOI',
  DinhKem = 'BIEU_MAU_DINH_KEM',
  PhanLoaiHopThuBiMat = 'PHAN_LOAI_HTBM',
  BaoCaoDeXuat = 'BAO_CAO_DE_XUAT',
  ChamDiemXepLoaiCaNhanThangCapCanBo = 'PHIEU_CHAM_DIEM_CA_NHAN_THANG_CAP_CAN_BO',
  ChamDiemXepLoaiCaNhanThangCapDoi = 'PHIEU_CHAM_DIEM_CA_NHAN_THANG_CAP_DOI',
  ChamDiemXepLoaiCaNhanThangCapPhong = 'PHIEU_CHAM_DIEM_CA_NHAN_THANG_CAP_PHONG',
  ChamDiemXepLoaiCaNhanNamCapCanBo = 'PHIEU_CHAM_DIEM_CA_NHAN_NAM_CAP_CAN_BO',
  ChamDiemXepLoaiCaNhanNamCapDoi = 'PHIEU_CHAM_DIEM_CA_NHAN_NAM_CAP_DOI',
  ChamDiemXepLoaiCaNhanNamCapPhong = 'PHIEU_CHAM_DIEM_CA_NHAN_NAM_CAP_PHONG',
  ChamDiemXepLoaiTapTheCapDoi = 'PHIEU_CHAM_DIEM_TAP_THE_CAP_DOI',
  ChamDiemXepLoaiTapTheCapPhong = 'PHIEU_CHAM_DIEM_TAP_THE_CAP_PHONG',
  ChamDiemXepLoaiTapTheCapCuc = 'PHIEU_CHAM_DIEM_TAP_THE_CAP_CUC_TINH',
  ChamDiemXepLoaiTapTheCapXa = 'PHIEU_CHAM_DIEM_TAP_THE_CAP_XA',
  BaoCaoThamMuu = 'BAO_CAO_THONG_KE'
}

export enum LoaiB1 {
  LapHoSo = 'Lập hồ sơ nghiệp vụ',
  LapPhan = 'Lập phần hồ sơ nghiệp vụ',
  LapTap = 'Lập tập hồ sơ nghiệp vụ',
  KetThucHoSo = 'Kết thúc hồ sơ nghiệp vụ',
  KetThucPhan = 'Kết thúc phần hồ sơ nghiệp vụ',
  KetThucTap = 'Kết thúc tập hồ sơ nghiệp vụ',
  TachHoSo = 'Tách hồ sơ nghiệp vụ',
  TachPhan = 'Tách phần hồ sơ nghiệp vụ',
  TachTap = 'Tách tập hồ sơ nghiệp vụ',
  NhapHoSo = 'Nhập hồ sơ nghiệp vụ',
  NhapPhan = 'Nhập phần hồ sơ nghiệp vụ',
  NhapTap = 'Nhập tập hồ sơ nghiệp vụ'
}

export enum LoaiNhiemVuEnums {
  NhiemVuChinh = '1',
  NhiemVuKiemNhiem = '2'
}

export enum DiaDiemEnums {
  QuocGia = 'quocGia',
  TinhThanhPho = 'tinhThanhPho',
  QuanHuyen = 'quanHuyen',
  XaPhuong = 'xaPhuong',
  ChiTietDiaDiem = 'chiTietDiaDiem'
}

// Dùng chung cho tất cả trạng thái: Trạng thái hồ sơ, trạng thái biểu mẫu...
export enum TrangThaiTrinhKyEnums {
  LuuMoi = '001',
  HuyTrinhKy = '002',
  ChoDuyet = '003',
  DaDuyet = '004',
  ChoKySo = '005',
  DaKySo = '006',
  NguoiDuyetChinhSua = '007',
  YeuCauBoSung = '008',
  TuChoi = '009',
  DaKyBQ1a = '010',
  DangGuiCQHS = '011',
  GuiCQHSThatBai = '012',
  ChoCQHSXuLy = '013',
  CQHSYeuCauBoSung = '014',
  CQHSTuChoi = '015',
  HienHanh = '016',
  DangKyLai = '017',
  KetThuc = '018',
  ChoNopLuu = '019',
  DaNopLuu = '020',
  DoiTiepNhanBanGiao = '026',
  DaBanGiao = '024',
  HoanThanh = '025',
  ChoTraLoi = '027',
  DangTraLoi = '028',
  DaGui = '029'
}

export enum TrangThaiDongBoEnums {
  ChoDongBo = '999'
}

export enum TrangThaiTinBanDauEnums {
  MoiTiepNhan = '021',
  DangXacMinh = '022',
  DaXacMinh = '023'
}

export enum TrangThaiPhanCongDangKyHoSoEnums {
  ChoPhanCong = '035-168',
  ChoDangKyHoSo = '035-169'
}

export enum LoaiYeuCauEnums {
  B5 = 'Yêu cầu tra cứu (B5)',
  TaoLap = 'Diễn biến đăng ký hồ sơ',
  TraoDoiThongTin = 'Trao đổi thông tin',
  TraoDoiThongTinPhanHoi = 'Trao đổi thông tin phản hồi',
  BanGiaoHoSoCungCap = 'Bàn giao hồ sơ cùng nơi đăng ký',
  BanGiaoHoSoKhacCap = 'Bàn giao hồ sơ khác nơi đăng ký',
  BaoCaoKetQuaXacMinhTin = 'Báo cáo kết quả xác minh tin',
  BaoCaoDanhGiaDeXuatXuLyTin = 'Báo cáo đánh giá đề xuất xử lý tin',
  PhanCongDangKyHoSo = 'Phân công đăng ký hồ sơ',
  MoTap = 'Mở tập',
  KetThucHoSo = 'Kết thúc hồ sơ',
  SapNhapHoSo = 'Sáp nhập hồ sơ',
  ChuyenLoaiHoSo = 'Chuyển loại hồ sơ',
  ThayDoiThongTinHoSo = 'Thay đổi thông tin hồ sơ',
  MatThatLacHoSo = 'Mất, thất lạc hồ sơ',
  KhoiPhucHoSoMatThatLac = 'Khôi phục hồ sơ mất thất lạc',
  ThayDoiThongTinDoiTuong = 'Thay đổi thông tin đối tượng',
  ChuyenLoaiDoiTuong = 'Chuyển loại đối tượng',
  ChuyenDienDoiTuong = 'Chuyển diện đối tượng',
  ChuyenLoaiLucLuong = 'Chuyển loại lực lượng',
  ChuyenNhiemVu = 'Chuyển nhiệm vụ',
  ThemNhiemVu = 'Thêm nhiệm vụ',
  DienBienKhac = 'Diễn biến khác',
  NopLuuHoSo = 'Nộp lưu hồ sơ',
  TrinhBQ1A = 'Trình BQ1A',
  BanGiaoTaiLieu = 'Bàn giao tài liệu',
  ThanhLoaiDoiTuong = 'Thanh loại đối tượng',
  PhanLoaiLucLuong = 'Phân loại lực lượng',
  BoSungDoiTuong = 'Bổ sung đối tượng'
}

export enum LoaiDienBienBanGiaoEnums {
  CungCapCungDonVi = 'CUNG_CAP_CUNG_DON_VI',
  CungCapKhacDonVi = 'CUNG_CAP_KHAC_DON_VI',
  KhacCap = 'KHAC_CAP'
}

export enum TypeYeuCauTrinhKyEnums {
  BieuMau = 'BIEU_MAU',
  DienBien = 'DIEN_BIEN',
  TuKyBanGiaoHoSo = 'BAN_GIAO_TU_KY'
}

export enum DienDoiTuongBieuMauB19aEnums {
  QuanLyNghiepVu = 'QUAN_LY_NGHIEP_VU',
  KiemTraNghiepVu = 'KIEM_TRA_NGHIEP_VU',
  ChinhTriKhac = 'CHINH_TRI_KHAC'
}

export enum DonViLevelEnums {
  LevelOne = 'DVC1_CUNG_CS_HSAN',
  LevelOneDiffer = 'DVC1_KHAC_CS_HSAN',
  LevelOneHsan = 'DVCAP1_HSAN',
  LevelTwo = 'DVCAP2_HSAN',
  LevelThree = 'DVCAP3_HSAN'
}

export enum DanhMucStatus {
  Enabled = 1
}

export enum ChucVuEnums {
  LanhDao = 'LANH_DAO', // fe check internal
  CanBo = 'CAN_BO', // fe check internal
  ChiHuy = 'CHI_HUY', // fe check internal
  ThamMuu = 'THAM_MUU' // fe check internal
}

export enum QTUDChucVuEnums {
  CanBo = '0000',
  VanThu = '0003',
  DanhMucThue = '1992',
  TuLenh = '2001',
  PhoTuLenh = '2002',
  CucTruong = '2101',
  PhoCucTruong = '2102',
  PhoCucTruongPhuTrach = '2112',
  ChanhVanPhong = '2301',
  PhoChanhVanPhong = '2302',
  GiamDoc = '3001',
  PhoGiamDoc = '3002',
  PhoGiamDocPhuTrach = '3012',
  TruongPhong = '4001',
  PhoTruongPhong = '4002',
  GiamDocTrungTam = '4101',
  PhoGiamDocTrungTam = '4102',
  TrungDoanTruong = '4201',
  PhoTrungDoanTruong = '4202',
  TruongCongAnHuyen = '5001',
  PhoTruongCongAnHuyen = '5002',
  GiamThi = '500401',
  PhoGiamThi = '500402',
  TruongCongAnThanhPho = '5101',
  PhoTruongCongAnThanhPho = '5102',
  TruongCongAnQuan = '5201',
  PhoTruongCongAnQuan = '5202',
  TruongCongAnThiXa = '5301',
  PhoTruongCongAnThiXa = '5302',
  DoiTruong = '6001',
  PhoDoiTruong = '6002',
  TramTruong = '600501',
  PhoTramTruong = '600502',
  TruongCongAnXa = '6101',
  PhoTruongCongAnXa = '6102',
  PhoTruongCongAnXaPhuTrach = '6112',
  TruongCongAnPhuong = '6201',
  PhoTruongCongAnPhuong = '6202',
  PhoTruongCongAnPhuongPhuTrach = '6212',
  TruongCongAnThiTran = '6301',
  PhoTruongCongAnThiTran = '6302',
  PhoTruongCongAnThiTranPhuTrach = '6312',
  TieuDoanTruong = '6401',
  PhoTieuDoanTruong = '6402',
  TruongDon = '6501',
  PhoTruongDon = '6502',
  PhoTruongDonPhuTrach = '6512',
  TrungDoiTruong = '7001',
  PhoDaiDoiTruong = '7002',
  DaiDoiTruong = '8001',
  PhoTrungDoiTruong = '8002',
  TieuDoiTruong = '9001',
  PhoTieuDoiTruong = '9002',
  BoTruong = '007',
  BoTruongBCA = '1001',
  ThuTruong = '064', // thứ trưởng
  ThuTruongBCA = '1002' // thứ trưởng
}

export enum AccountTypeEnums {
  // Đây là leaderCadres trong get me
  LanhDao = 1,
  CanBo = 2
}

export enum AdminOrUserEnums {
  // đây là accountType trong get me
  Admin = 1,
  User = 2
}

export enum LoaiSinhHoatEnums {
  DuKien = 'DU_KIEN',
  DaDienRa = 'DA_DIEN_RA'
}

export enum KetQuaPhanLoaiEnums {
  // XuatSac = 'XUAT_SAC',
  Kha = 'KHA',
  TrungBinh = 'TRUNG_BINH',
  Kem = 'KEM'
}

export enum PhanHeHoSoEnums {
  //TODO: nvcban cần đầu api riêng để lấy thông tin phân hệ hồ sơ nhưng chưa có
  DieuTraCoBan = '101',
  QuanLyNghiepVu = '105',
  //TODO: sửa mã
  KiemTraNghiepVu = '105.2',
  TinBanDau = 'tin_ban_dau',
  VanDeNghiepVu = '107',
  TruyXet = '108',
  TruyTim = '109',
  LucLuongBiMat = '106',
  NhaAnToan = '111',
  HopThuBiMat = '110',
  ChuyenAn = '102',
  DieuTraCoBanCanhSat = '101001'
}

export enum TinhTrangDiemHenBiMatEnums {
  DangSuDung = 'DANG_SU_DUNG',
  KhongSuDung = 'KHONG_SU_DUNG'
}

export enum LoaiDeXuatEnums {
  TraCuuB5 = 'TRA_CUU_B5',
  DangKyHoSo = 'DANG_KY_HO_SO',
  MoTap = 'MO_TAP',
  BanGiaoHoSoCungCap = 'BAN_GIAO_HO_SO_CUNG_CAP',
  BanGiaoHoSoKhacCap = 'BAN_GIAO_HO_SO_KHAC_CAP',
  SapNhapHoSo = 'SAP_NHAP_HO_SO',
  ChuyenLoaiHoSo = 'CHUYEN_LOAI_HO_SO',
  ThayDoiThongTinHoSo = 'THAY_DOI_THONG_TIN_HO_SO',
  MatThatLacHoSo = 'MAT_THAT_LAC_HO_SO',
  KhoiPhucHoSoMatThatLac = 'KHOI_PHUC_HO_SO_MAT_THAT_LAC',
  KetThucHoSo = 'KET_THUC_HO_SO',
  ThayDoiThongTinDoiTuong = 'THAY_DOI_THONG_TIN_DOI_TUONG',
  ChuyenLoaiDoiTuong = 'CHUYEN_LOAI_DOI_TUONG',
  ChuyenDienDoiTuong = 'CHUYEN_DIEN_DOI_TUONG',
  ChuyenLoaiLucLuong = 'CHUYEN_LOAI_LUC_LUONG',
  ChuyenNhiemVu = 'CHUYEN_NHIEM_VU',
  ThemNhiemVu = 'THEM_NHIEM_VU',
  DienBienKhac = 'DIEN_BIEN_KHAC',
  TrinhBQ1A = 'TRINH_BQ1A'
}

// export enum LoaiHoSoTongHopDeXuatEnums {
//   DieuTraCoBan = 'DTCB',
//   QuanLyNghiepVu = 'QUAN_LY_NGHIEP_VU',
//   KiemTraNghiepVu = 'KIEM_TRA_NGHIEP_VU',
//   TinBanDau = 'TIN_BAN_DAU',
//   TruyXet = 'TRUY_XET',
//   TruyTim = 'TRUY_TIM',
//   VanDeNghiepVu = 'VAN_DE_NGHIEP_VU',
//   LucLuongBiMat = 'LUC_LUONG_BI_MAT',
//   NhaAnToan = 'NHA_AN_TOAN',
//   HopThuBiMat = 'HOP_THU_BI_MAT',
//   ChuyenAn = 'CHUYEN_AN',
//   YeuCauTraCuuB5 = 'YEU_CAU_TRA_CUU_B5'
// }

export enum TrangThaiPhanCongNhiemVuEnums {
  ChuaThucHien = '001',
  DangThucHien = '002',
  HoanThanh = '003'
}
export enum DienBienHoSoEnums {
  TongHop = '99999999999999999999999999999',
  DangKyHoSo = '000',
  MoTap = '001',
  MatThatLacHoSo = '002',
  BanGiaoHoSoCungCap = '003',
  BanGiaoHoSoKhacCap = '004',
  KhoiPhucHoSoMatThatLac = '009',
  ThayDoiThongTinHoSo = '010',
  ThemNhiemVu = '147',
  TrinhBQ1a = '020',
  ChuyenLoaiDoiTuong = '044',
  ChuyenNhiemVu = '030',
  ChuyenDienDoiTuong = '032',
  SapNhapHoSo = '042',
  ChuyenLoaiHoSo = '043',
  ThayDoiThongTinDoiTuong = '050',
  DienBienKhac = '059',
  KetThucNopLuu = '023',
  ChuyenLoaiLucLuong = '031',
  PhanLoaiLucLuong = '148',
  BoSungDoiTuong = '008',
  GiaHanDoiTuong = '149'
}

export enum ModeKySoEnums {
  KyVanBan = 1, //văn thư ký văn bản mới, chữ ký lãnh đạo (Dạng ảnh theo NĐ 30/2020)
  KySaoY = 2, // ký sao y, chèn vào góc trên bên trái
  KySaoLuc = 3, // ký sao lục
  KyTrichSao = 4, // ký trích sao
  KyPhuLuc = 5 // ký phụ lục, in nghiêng
}

//TODO: Khi deploy nhớ check lại các mã hardcode sau
export const VN_CODE = '250';
export const NGHE_NGHIEP_KHAC_CODE = '999';
export const GIOI_TINH_NU_CODE = '2';
export const QUAN_HE_GIA_DINH_CHA_CODE = '0212';
export const QUAN_HE_GIA_DINH_ME_CODE = '03';
export const QUAN_HE_GIA_DINH_VO_CODE = '04';
export const QUAN_HE_GIA_DINH_CHONG_CODE = '05';

export enum QuyenHoSoEnums {
  QuyenQuanLyHoSo = 'QUYEN_QUAN_LY_HO_SO',
  QuyenThemTaiLieuHoSo = 'QUYEN_THEM_TAI_LIEU_HO_SO',
  QuyenXemHoSo = 'QUYEN_XEM_HO_SO'
}

export enum QuyenTaiLieuEnums {
  ChinhSua = 'CHINH_SUA',
  ChiDoc = 'CHI_DOC'
}

export enum CapDonViEnums {
  CapTrungUong = '001', // not use
  CapCucNghiepVu = '002',
  CapPhongThuocCuc = '003',
  CapDoiThuocCuc = '004',
  CapDiaPhuong = '005', // not use
  CapTinh = '006',
  CapPhongNghiepVu = '007',
  CapQuanHuyen = '008',
  CapDoiThuocPhongNgiepVu = '009',
  CapXaPhuongThiTran = '010', // not use
  CapXa = '010001',
  CapPhuong = '010002',
  ThiTran = '010003',
  CapDoiThuocHuyen = '011', // bao gồm cả cấp đồn công an
  CapTraiGiam = '012',
  Khac = '013' // not use
}

export enum FormItemTypeEnums {
  Input = 'input',
  DateRangePicker = 'dateRangePicker',
  Select = 'select',
  MultiSelect = 'multiSelect',
  CascaderDoiTuong = 'cascader',
  CascaderMultipleDoiTuong = 'multiCascader',
  CascaderDanhMucQLNV = 'CascaderDanhMucQLNV',
  TinhThanhPhoQuanHuyenXaPhuong = 'TinhThanhPhoQuanHuyenXaPhuong'
}

export enum CongTacEnums {
  TongHop = 'tongHop',
  DieuTraCoBan = 'dieuTraCoBan',
  QuanLyNghiepVu = 'quanLyNghiepVu',
  KiemTraNghiepVu = 'kiemTraNghiepVu',
  ChuyenAnNghiepVu = 'chuyenAnNghiepVu',
  LucLuongBiMat = 'lucLuongBiMat',
  HopThuBiMat = 'hopThuBiMat',
  VanDeNghiepVu = 'vanDeNghiepVu',
  TruyXet = 'truyXet',
  TruyTim = 'truyTim',
  TinBanDau = 'tinBanDau',
  NhaAnToan = 'nhaAnToan',
  DiemHenBiMat = 'diemHenBiMat',
  DoiTuongConNguoi = 'doiTuongConNguoi'
}

export enum NameFields {
  SoDangKy = 'soDangKy',
  NgayLap = 'ngayLap',
  NgayTiepNhan = 'ngayTiepNhan',
  NgayLapTuNgay = 'ngayLapTuNgay',
  NgayLapDenNgay = 'ngayLapDenNgay',
  NgayDangKy = 'ngayDangKy',
  NgayDangKyTuNgay = 'ngayDangKyTuNgay',
  NgayDangKyDenNgay = 'ngayDangKyDenNgay',
  Nguon = 'listNguon',
  DonViQuanLy = 'listDonViQuanLy',
  CbQuanLy = 'listCbQuanLy',
  TrangThai = 'listTrangThai',
  DoiTuong = 'listLoaiDoiTuong',
  DanhMuc = 'listDanhMuc',
  Khoan = 'listKhoan',
  Dieu = 'listDieu',
  TinhChat = 'listTinhChat',
  LoaiChuyenAn = 'listLoaiChuyenAn',
  LoaiNhaAnToan = 'listLoaiNat',
  LoaiDoiTuongTruyXet = 'listDoiTuong',
  TinhTrang = 'listTinhTrang',
  LLBM = 'listLoaiLlbm',
  PhuongPhap = 'listPhuongPhapXayDung',
  ThanhPhan = 'listThanhPhan',
  LoaiTruyTim = 'listLoaiTruyTim',
  LoaiNghiepVu = 'listLoaiNghiepVu',
  TinhChatVuViec = 'tinhChatVuViecs',
  GioiTinh = 'listGioiTinh',
  NoiDungTin = 'noiDungTin',
  TinhThanhPhoQuanHuyenXaPhuong = 'tinhThanhPhoQuanHuyenXaPhuong'
}

export enum ConfigColumnFields {
  SoDangKy = 'soDangky',
  TenDiemHen = 'tenDiemHen',
  NgayLap = 'ngayLap',
  NgayDangKy = 'ngayDangKy',
  LoaiHoSo = 'loaiHoSo',
  Nguon = 'nguon',
  HeLucLuong = 'heLucLuong',
  DonViQuanLy = 'donViQuanLy',
  CanBoQuanLy = 'canBoQuanLy',
  TrichYeu = 'trichYeu',
  noiDungTin = 'noiDungTin',
  TrangThai = 'trangThai',
  DoiTuongDTCB = 'doiTuongDTCB',
  TinhChat = 'tinhchat',
  TinhTrang = 'tenLoaiTinhTrang',
  LoaiChuyenAn = 'tenLoaiChuyenAn',
  LoaiLlbm = 'loaiLlbm',
  BiDanh = 'biDanh',
  PhuongPhap = 'phuongPhapXayDung',
  ThanhPhan = 'thanhPhan',
  DanhMuc = 'danhMuc',
  Dieu = 'dieu',
  Khoan = 'khoan',
  LoaiNghiepVu = 'tenLoaiNgiepVu',
  LoaiNhaAnToan = 'tenLoaiNat',
  DoiTuongTruyXet = 'doiTuongTruyXet',
  LoaiTruyTim = 'loaiTruyTim',
  NgayTiepNhan = 'ngayTiepNhan',
  TinhChatCongViec = 'tinhChatVuViec',
  HoTen = 'hoTen',
  GioiTinh = 'tenGioiTinh',
  CCCD = 'cccd',
  NgaySinh = 'ngaySinh',
  Tuoi = 'tuoi',
  QueQuan = 'queQuan',
  ThuocDien = 'thuocDien',
  ThongTinKhac = 'thongTinKhac'
}

export enum MaLoaiHoSoEnums {
  QLNV = '004',
  KTNV = '005'
}

export enum MaTinhChatDoiTuong {
  QLNV = '911',
  KTNV = '910'
}

export enum LoaiLLBMEnums {
  DacTinh = '001',
  Ctv = '002',
  Csbm = '003'
}

export enum UsingNameLoaiLLBMEnums {
  DacTinh = 'Đt',
  Ctv = 'Ctv',
  Csbm = 'Csbm'
}

export enum LoaiBanGiaoHoSoEnums {
  BanGiaoDi = 'BAN_GIAO_DI',
  BanGiaoDen = 'BAN_GIAO_DEN'
}

export enum LoaiDoiTuongNghiepVu {
  QuanLyNghiepVu = '004',
  KiemTraNghiepVu = '005'
}

//TODO: Sửa sau
export enum XepLoaiHoSo {
  Tot = 'TOT',
  Kha = 'KHA',
  TrungBinh = 'TRUNG_BINH',
  Kem = 'KEM'
}

export enum TenPhanMem {
  NghiepVuCoBanAnNinh = 'NVCBAN',
  PhanMemHoSo = 'CQHS'
}

export enum LoaiTaiLieuEnums {
  DinhKem = 'TAI_LIEU_SCAN',
  SoanThao = 'SOAN_THAO',
  SoanSan = 'TAI_LEN'
}

export enum FileTypeEnums {
  Doc = 'doc',
  Pdf = 'pdf',
  Image = 'img',
  File = 'file',
  Excel = 'xlsx',
  Video = 'video',
  Audio = 'audio'
}

export enum LoaiThongTinTraoDoiEnums {
  ThongTinDen = 'THONG_TIN_DEN',
  ThongTinDi = 'THONG_TIN_DI'
}

export enum DanhMucEnums {
  ThanhPho = 'danhMucThanhPho',
  GioiTinh = 'danhMucGioiTinh',
  QuocTich = 'danhMucQuocTich',
  DanToc = 'danhMucDanToc',
  TonGiao = 'danhMucTonGiao',
  NgheNghiep = 'danhMucNgheNghiep',
  CapBac = 'danhMucCapBac',
  ChucVu = 'danhMucChucVu',
  TrinhDoVanHoa = 'danhMucTrinhDoVanHoa',
  ThanhPhanGiaDinh = 'danhMucThanhPhanGiaDinh',
  PhanLoaiDangVien = 'danhMucPhanLoaiDangVien',

  /**
   * Dths
   */
  DthsDonViTiepNhan = 'danhMucDthsDonViTiepNhan',
  DthsNguonKhoiTo = 'danhMucDthsNguonKhoiTo',
  DthsNguonKhoiToTuCTNV = 'danhMucDthsNguonKhoiToTuCTNV',
  /**
   * Dths - end
   */

  LoaiTuyenDuong = 'danhMucTuyenDuong',
  DiaBan = 'danhMucDiaBan',
  LoaiDiaBan = 'danhMucLoaiDiaBan',
  LoaiDiaBanDacTrung = 'danhMucLoaiDiaBanDacTrung'
}

export enum CucAnNinhEnums {
  CucAnNinhDoiNgoai = 'A01',
  CucAnNinhNoiDia = 'A02',
  CucAnNinhChinhTriNoiBo = 'A03',
  CucAnNinhKinhTe = 'A04',
  CucAnNinhPhongChongToiPhamSuDungCongNgheCao = 'A05',
  CucKyThuatNghiepVu = 'A06',
  CucNgoaiTuyen = 'A07',
  CucXuatNhapCanh = 'A08',
  CucAnNinhDieuTra = 'A09',
  CucAnNinhDoiNgoaiCapTinh = 'PA01',
  CucAnNinhNoiDiaCapTinh = 'PA02',
  CucAnNinhChinhTriNoiBoCapTinh = 'PA03',
  CucAnNinhKinhTeCapTinh = 'PA04',
  CucAnNinhPhongChongToiPhamSuDungCongNgheCaoCapTinh = 'PA05',
  CucKyThuatNghiepVuCapTinh = 'PA06',
  CucNgoaiTuyenCapTinh = 'PA07',
  CucXuatNhapCanhCapTinh = 'PA08',
  CucAnNinhDieuTraCapTinh = 'PA09'
}

export enum HeLucLuongEnums {
  AnNinh = '1',
  CanhSat = '2'
}

export enum SubsystemEnums {
  AnNinh = '2',
  CanhSat = '1'
}

export enum LoaiLyDoHoSoEnums {
  KetThucHoSo = '005'
}

export enum HeLucLuongAnNinhEnums {
  AnNinhDoiNgoai = '101',
  AnNinhNoiDia = '102',
  AnNinhChinhTriNoiBo = '103',
  AnNinhKinhTe = '104',
  AnNinhPhongChongToiPhamSuDungCongNgheCao = '105',
  KyThuatNghiepVu = '106',
  NgoaiTuyen = '107',
  XuatNhapCanh = '108',
  AnNinhDieuTra = '109'
}

export enum HeLucLuongAnNinhThuVienNghiepVuEnums {
  AnNinhDoiNgoai = '101',
  AnNinhNoiDia = '102',
  AnNinhChinhTriNoiBo = '103',
  AnNinhKinhTe = '104',
  AnNinhPhongChongToiPhamSuDungCongNgheCao = '105',
  KyThuatNghiepVu = '106',
  NgoaiTuyen = '107',
  XuatNhapCanh = '108',
  AnNinhDieuTra = '109',
  V01 = 'V01',
  V06 = 'V06'
}

export enum DiaDiemSinhHoatEnums {
  DiemHenBiMat = 'DIEM_HEN_BI_MAT',
  NhaAnToan = PhanHeHoSoEnums.NhaAnToan,
  HopThuBiMat = PhanHeHoSoEnums.HopThuBiMat,
  Khac = 'KHAC'
}

export enum MucDichPQKTvaNghienCuuHoSoEnums {
  KiemTraHoSo = 'KIEM_TRA_HO_SO',
  NghienCuuHoSo = 'NGHIEN_CUU_HO_SO'
}

export enum BieuMauAction {
  ThemMoi = 'add',
  ChinhSua = 'edit',
  Xoa = 'delete',
  KetXuat = 'export',
  NhanBan = 'clone'
}

export enum SoanThaoMode {
  Read = 'read',
  Write = 'write'
}

export enum FormNameDoiTuongEnums {
  QuanHeGiaDinh = 'formQuanHeGiaDinh'
}

export enum TypeViewCoNguoi {
  QUAN_HE = 'QUAN_HE',
  UPDATE = 'UPDATE',
  THEM_MOI = 'THEM_MOI',
  VIEW = 'VIEW',
  CONNGUOILIENQUAN = 'CONNGUOILIENQUAN'
}

export enum NotificationEnums {
  ThongBao = '1',
  CanhBao = '2'
}

export enum NotificationStatusEnums {
  Seen = '3',
  Unseen = '2'
}

export enum NotificationStrategyEnums {
  SEND_ALL = '1',
  ONLY_RECEIVERS = '0'
}

export enum NotificationPriorityEnums {
  HIGH = '1',
  MEDIUM = '0'
}

export enum BussinessEnums {
  DangKyHoSo = 'DANG_KY_HO_SO',
  DienBienHoSo = 'DIEN_BIEN',
  HoSoChuTriHoSoPhoiHop = 'HoSoChuTriHoSoPhoiHop',
  TraoDoiThongTin = 'TRAO_DOI_THONG_TIN',
  TraoDoiThongTinPhanHoi = 'TRAO_DOI_THONG_TIN_PHAN_HOI',
  TaiLieu = 'BIEU_MAU',
  PhieuChamDiemXepLoaiCaNhanThangCapCanBo = BieuMau.ChamDiemXepLoaiCaNhanThangCapCanBo,
  PhieuChamDiemXepLoaiCaNhanThangCapDoi = BieuMau.ChamDiemXepLoaiCaNhanThangCapDoi,
  PhieuChamDiemXepLoaiCaNhanThangCapPhong = BieuMau.ChamDiemXepLoaiCaNhanThangCapPhong,
  PhieuChamDiemXepLoaiCaNhanNamCapCanBo = BieuMau.ChamDiemXepLoaiCaNhanNamCapCanBo,
  PhieuChamDiemXepLoaiCaNhanNamCapDoi = BieuMau.ChamDiemXepLoaiCaNhanNamCapDoi,
  PhieuChamDiemXepLoaiCaNhanNamCapPhong = BieuMau.ChamDiemXepLoaiCaNhanNamCapPhong,
  PhieuChamDiemXepLoaiTapTheCapDoi = BieuMau.ChamDiemXepLoaiTapTheCapDoi,
  PhieuChamDiemXepLoaiTapTheCapPhong = BieuMau.ChamDiemXepLoaiTapTheCapPhong,
  PhieuChamDiemXepLoaiTapTheCapCuc = BieuMau.ChamDiemXepLoaiTapTheCapCuc
}

export enum ActionEnums {
  TrinhKy = 'TrinhKy',
  YeuCauBoSung = 'YeuCauBoSung',
  TuChoi = 'TuChoi',
  Duyet = 'Duyet',
  KySo = 'KySo',
  HoanThanh = 'HoanThanh',
  HuyTrinhKy = 'HuyTrinhKy',
  KetThucHoSoPhoiHop = 'KetThucHoSoPhoiHop',
  KetThucHoSoChuTri = 'KetThucHoSoChuTri',
  TraoDoiThongTinHoanThanhGui = 'TraoDoiThongTinHoanThanhGui',
  TraoDoiThongTinHoanThanhTraLoi = 'TraoDoiThongTinHoanThanhTraLoi'
}

export enum LoaiBaoCaoThongKeEnums {
  DanhSachBaoCao = 'DanhSachBaoCao',
  MauChamDiem = 'MauChamDiem'
}

export enum KyBaoCaoEnums {
  Ngay = 1,
  Thang = 2,
  Quy = 3,
  Nam = 4
}

export enum KyBaoCaoPickerEnums {
  Ngay = 'date',
  Thang = 'month',
  Quy = 'quarter',
  Nam = 'year'
}

export enum CapDonViTrongQLCanBoEnums {
  CapCucTinh = 2,
  CapPhongHuyen = 3,
  CapDoiXa = 4
}

export enum SortOrderEnums {
  LongAscend = 'ascend',
  ShortAscend = 'asc',
  LongDescend = 'descend',
  ShortDescend = 'desc'
}

export enum ThongTinCaNhanA2AEnums {
  HoTen = 'hoTen',
  NgaySinh = 'ngaySinh',
  GioiTinh = 'gioiTinh',
  Cccd = 'cccd',
  HoChieu = 'hoChieu',
  NgayCapHoChieu = 'ngayCapHoChieu',
  NoiCapHoChieu = 'noiCapHoChieu',
  QuocTich = 'quocTich',
  DanToc = 'danToc',
  QuocGiaQueQuan = 'quocGiaQueQuan',
  TinhQueQuan = 'tinhQueQuan',
  HuyenQueQuan = 'huyenQueQuan',
  XaQueQuan = 'xaQueQuan',
  QueQuan = 'queQuan',
  QuocGiaDktt = 'quocGiaDktt',
  TinhDktt = 'tinhDktt',
  HuyenDktt = 'huyenDktt',
  XaDktt = 'xaDktt',
  Dktt = 'dktt',
  QuocGiaNoiCuTru = 'quocGiaNoiCuTru',
  TinhNoiCuTru = 'tinhNoiCuTru',
  HuyenNoiCuTru = 'huyenNoiCuTru',
  XaNoiCuTru = 'xaNoiCuTru',
  NoiCuTru = 'noiCuTru',
  TrinhDoChuyenMon = 'trinhDoChuyenMon',
  NgheNghiep = 'ngheNghiep',
  ChucVu = 'chucVu',
  NoiLamViec = 'noiLamViec',
  HoTenCha = 'hoTenCha',
  HoTenMe = 'hoTenMe',
  HoTenVoChong = 'hoTenVoChong'
}

export enum ViewQuanLyCanBoEnums {
  TongHop = 'tongHop',
  ChiTiet = 'chiTiet',
  ChiTietCanBo = 'chiTietDSCanBo',
  ChiTietHoSo = 'chiTietSLHoSo'
}

export enum DoDaiCapDonViEnums {
  CapBo = 3,
  CapCucTinh = 6,
  CapPhongHuyen = 9,
  CapDoiXa = 12
}

export type DanhMucNguonLapConfigEnums =
  | HoSo.QuanLyNghiepVu // Chuyên án là dữ liệu đồng bộ, ko có nguồn
  | HoSo.KiemTraNghiepVu
  | HoSo.TruyXet
  | HoSo.TruyTim
  | HoSo.VanDeNghiepVu
  | HoSo.ChuyenAn
  | HoSo.TinBanDau;

export enum CollapsedStatusEnums {
  Collapsed = 1,
  Expanded = 0
}

export enum TabChiTietHoSoEnums {
  ThongTinChung = 'thongTinChung',
  DanhSachTaiLieu = 'danhSachTaiLieu',
  DienBienHoSo = 'dienBienHoSo',
  DienBienDoiTuong = 'dienBienDoiTuong',
  DienBienLlbm = 'dienBienLlbm'
}

export enum TabChiTietVuAnEnums {
  ThongTinChung = 'tabThongTinChung',
  ConNguoiLienQuan = 'tabConNguoiLienQuan',
  ToChucLienQuan = 'tabToChucLienQuan',
  TaiKhoanNganHang = 'tabTaiKhoanNganHang',
  VatChungGiamDinh = 'tabVatChungGiamDinh',
  KetLuanDieuTra = 'tabKetLuanDieuTra',
  HoSoVuAn = 'tabHoSoVuAn',
  MucLucVanBan = 'tabMucLucVanBan',
  PhanQuyenXem = 'tabPhanQuyenXem'
}

export enum PhanLoaiHoSoEnums {
  HoSoChinh = 'hoSoChinh',
  HoSoPhoiHop = 'hoSoPhoiHop'
}

export enum LoaiDanhGiaEnums {
  XuatXac = 'XUAT_XAC',
  Tot = 'TOT',
  TrungBinh = 'TRUNG_BINH',
  Kem = 'KEM'
}

export enum FetchUsersStrategyEnums {
  LanhDaoVaCapTren = '1',
  LanhDaoCanBoVaCapDuoi = '2',
  LanhDaoVaCanBo = '3'
}

export enum ThongTinKhacTypeAddOnEnums {
  HoTen = 'HO_TEN',
  NgaySinh = 'NGAY_SINH',
  CCCD = 'CCCD',
  HoTenCha = 'HO_TEN_CHA',
  HoTenMe = 'HO_TEN_ME',
  HoTenVoChong = 'HO_TEN_VO_CHONG',
  QuocTich = 'QUOC_TICH',
  SoDienThoai = 'SO_DIEN_THOAI'
}

export enum DiaChiKhacAddOnTypeEnums {
  QueQuan = 'QUE_QUAN',
  ChoOHienNay = 'CHO_O_HIEN_NAY'
}

export enum InitTCTHFormSearchStatusEnums {
  Init = 'init',
  Done = 'done'
}

export enum BieuMauHTMLToaDoEnums {
  ChuKy1 = 'chữ ký 1',
  Ngay1 = 'ngày ký 1',
  Thang1 = 'tháng ký 1',
  Nam1 = 'năm ký 1',
  ChuKy2 = 'chữ ký 2',
  Ngay2 = 'ngày ký 2',
  Thang2 = 'tháng ký 2',
  Nam2 = 'năm ký 2'
}

export enum XuLyYeuCauNghiepVuActionEnums {
  Luu = 'LUU',
  Duyet = 'DUYET',
  // TraLai = 'TRA_LAI',
  // TuChoi = 'TU_CHOI'
  KySo = 'KY_SO'
}

export enum LoaiChamDiemXepLoaiEnums {
  CaNhanThang = 'CA_NHAN_THANG',
  CaNhanNam = 'CA_NHAN_NAM',
  TapThe = 'TAP_THE'
}

export enum LoaiDangKyBanGiaoEnums {
  TrucTuyen = '1',
  TrucTiep = '2'
}

export enum ManHinhGetDetailTrinhKy {
  XuLyYeuCauNghiepVu = 'XU_LY_YEU_CAU_NGHIEP_VU',
  TongHopDeXuat = 'TONG_HOP_DE_XUAT'
}

export enum TrucThuocCoQuanHoSoEnums {
  KhongThuocCoQuanHoSo = 0,
  CoQuanHoSoCapCuc = 1,
  CoQuanHoSoCapTinh = 2
}

export enum ThongBaoCanhBaoEnum {
  ThongBao = 'thong-bao',
  CanhBao = 'canh-bao'
}

export enum LoaiLyDoEnums {
  HoSo = '1',
  DoiTuong = '2'
}

export const MaThongKeTaiLieu = 'THONG_KE_TAI_LIEU';

export enum LoaiKetQuaKafkaEnums {
  ThanhCong = '1',
  ThatBai = '2'
}

export enum TrangThaiXuLyEnums {
  DaXuLy = 'DA_XU_LY',
  ChoXuLy = 'CHO_XU_LY'
}

export enum TrangThaiDuongTruyenInternet {
  Testing = 'TESTING',
  NoInternet = 'NO_INTERNET'
}

export enum SharingTypeEnums {
  NganhDoc = 'NGANH_DOC',
  DonViCapDuoi = 'DON_VI_CAP_DUOI',
  DonViCapTinh = 'DON_VI_CAP_TINH',
  NhomDonVi = 'NHOM_DON_VI',
  NhomNguoiDung = 'NHOM_NGUOI_DUNG'
}

export enum DonViCapDuoiSharingModeEnums {
  LanhDaoOnly = 'LANH_DAO_ONLY',
  TatCa = 'TAT_CA'
}

export enum TVNVSharingGroupModeEnums {
  BySelectGroupUnits = 'BY_SELECT_GROUP_UNITS',
  BySelectUnits = 'BY_SELECT_UNITS'
}

export enum LoaiXuatNhapCanhEnums {
  XuatCanh = 'X',
  NhapCanh = 'N'
}

export enum LoaiBaoCaoThongKe {
  ThongKeThiDiem = '035027006033'
}

export enum ViewModeEnums {
  fit = 'FIT',
  scroll = 'SCROLL'
}

export enum RouterUrl {
  ConNguoi = 'con-nguoi',
  DsVuAn = 'ds_vuan',
  DienBienVuAn = 'dienbien_vuan/sua'
}

export enum LoaiDiaChi {
  //#region ConNguoi
  QUEQUAN = 1,
  THUONGTRU = 2,
  TAMTRU = 3,
  NOIOHIENTAI = 4,
  KHAC = 5,
  NOISINH = 6,

  QUEQUAN_CU = 7,
  THUONGTRU_CU = 8,
  TAMTRU_CU = 9,
  NOIOHIENTAI_CU = 10,
  NOISINH_CU = 11,
  KHAC_CU = 12,
  //#endregion
  //#region CoQuan
  TRUSOCHINH = 13,
  LIENLAC = 15,

  TRUSOCHINH_CU = 14,
  LIENLAC_CU = 16,
  //#endregion,
  DIEM_TUDIEM = 17,

  XAYDUNG_DUAN = 18
}
