export interface SuKien {
  idSuKien: string;
  tenSuKien: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  idDanhMuc?: string;
  tenDanhMuc?: string;
  diaDiem?: string;
  ghiChu?: string;
}

export interface LoaiSuKien {
  id: string;
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface BodySuKien extends Omit<SuKien, 'idSuKien'> {}

export interface BodyLoaiSuKien {
  tenSuKien: string;
}

export interface ParamsSuKien extends Pick<SuKien, 'ngayBatDau' | 'ngayKetThuc'> {
  idDanhMucs?: string[];
  tenSuKien?: string;
}
