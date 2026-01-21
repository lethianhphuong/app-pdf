import dayjs from 'dayjs';

export interface DsConNguoiPrams {
  hoTen?: string;
  trangThai?: string;
  page: number;
  size: number;
  sort?: string[];
  ngaySinh?: string[];
}

export interface DiaChi {
  soNha: string;
  diaChiChiTiet: string;
  xa: string;
  maXa: string;
  huyen: string;
  maHuyen: string;
  tinh: string;
  maTinh: string;
  loaiDiaChi: number;
  quocGia: string;
  maQuocGia: string;
}

export interface ConNguoiDs {
  id: string;
  hoTen: string;
  ngaySinh?: string;
  diaChi: DiaChi[];
  ngaySinhGoc?: string;
}

export interface DataResResponse {
  total: number;
  data: ConNguoiDs[];
}

export interface ConNguoi {
  id?: string;
  hoTen?: string;
  ngayCap?: dayjs.Dayjs;
  ngayCapHoChieu?: dayjs.Dayjs;
}

export interface ThongTinConNguoi {
  conNguoi: ConNguoi;
}
