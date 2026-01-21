import { nanoid } from 'nanoid';
import { ChiTietLichSuCapNhat } from './types';

export const fakeDataLichSuCapNhat: ChiTietLichSuCapNhat[] = [
  {
    id: nanoid(36),
    ngayCapNhat: '2025-04-24',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'cán bộ',
    maChucNang: nanoid(36),
    tenChucNang: 'Diễn biến hồ sơ',
    noiDung: `Diễn biến trực tiếp chuyển loại/ chuyển diện đối tượng`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Đã cập nhật'
  },
  {
    id: nanoid(36),
    ngayCapNhat: '2025-04-24',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'cán bộ',
    maChucNang: nanoid(36),
    tenChucNang: 'Truy tìm',
    noiDung: `Tạo lập truy tìm cấp xã`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Đã cập nhật'
  },
  {
    id: nanoid(36),
    ngayCapNhat: '2025-04-24',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'cán bộ',
    maChucNang: nanoid(36),
    tenChucNang: 'Xử lý xác minh tin ban đầu',
    noiDung: `Xử lý xác minh tin ban đầu cấp xã`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Đã cập nhật'
  },
  {
    id: nanoid(36),
    ngayCapNhat: '2025-02-17',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'lãnh đạo',
    maChucNang: nanoid(36),
    tenChucNang: 'Ký số',
    noiDung: `Cập nhật bổ sung thông tin chữ ký số: tự động hiển thị cấp bậc và họ tên lãnh đạo`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Đã cập nhật'
  },
  {
    id: nanoid(36),
    ngayCapNhat: '2024-10-28',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'lãnh đạo',
    maChucNang: nanoid(36),
    tenChucNang: 'Cập nhật dữ liệu hồ sơ hiện hành',
    noiDung: `Cập nhật bổ sung chức năng Cập nhật dữ liệu hồ sơ hiện hành`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Phần V: Hướng dẫn cập nhật dữ liệu hồ sơ hiện hành'
  }
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.TraCuuB5,
  //   tenChucNang: getMatCongTacOption(HoSo.TraCuuB5)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.TraCuuB5)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.DieuTraCoBan,
  //   tenChucNang: getMatCongTacOption(HoSo.DieuTraCoBan)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.DieuTraCoBan)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.QuanLyNghiepVu,
  //   tenChucNang: getMatCongTacOption(HoSo.QuanLyNghiepVu)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.QuanLyNghiepVu)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.KiemTraNghiepVu,
  //   tenChucNang: getMatCongTacOption(HoSo.KiemTraNghiepVu)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.KiemTraNghiepVu)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.TinBanDau,
  //   tenChucNang: getMatCongTacOption(HoSo.TinBanDau)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.TinBanDau)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.TruyXet,
  //   tenChucNang: getMatCongTacOption(HoSo.TruyXet)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.TruyXet)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.TruyTim,
  //   tenChucNang: getMatCongTacOption(HoSo.TruyTim)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.TruyTim)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.ChuyenAn,
  //   tenChucNang: getMatCongTacOption(HoSo.ChuyenAn)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.ChuyenAn)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.LucLuongBiMat,
  //   tenChucNang: getMatCongTacOption(HoSo.LucLuongBiMat)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.LucLuongBiMat)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.NhaAnToan,
  //   tenChucNang: getMatCongTacOption(HoSo.NhaAnToan)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.NhaAnToan)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.HopThuBiMat,
  //   tenChucNang: getMatCongTacOption(HoSo.HopThuBiMat)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.HopThuBiMat)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // },
  // {
  //   id: nanoid(36),
  //   ngayCapNhat: '2024-10-24',
  //   maLoaiNguoiDung: nanoid(36),
  //   tenLoaiNguoiDung: 'cán bộ',
  //   maChucNang: HoSo.VanDeNghiepVu,
  //   tenChucNang: getMatCongTacOption(HoSo.VanDeNghiepVu)?.label,
  //   noiDung: `Cập nhật bổ sung chức năng ${getMatCongTacOption(HoSo.VanDeNghiepVu)?.label}`,
  //   maMucHDSD: nanoid(36),
  //   tenMucHDSD: 'Đã cập nhật'
  // }
];
