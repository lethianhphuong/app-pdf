import { z } from 'zod';
import { ApiResponseDths, ApiResponseQtud, BaseRequest_Schema } from '../types';
import { QueryOptions_Schema } from '@/typings/react-query';

//#region Common type + map
const DanhMucTypePrefix = 'danhMuc';

export enum DanhMucType {
  DanToc = DanhMucTypePrefix + 'DanToc',
  TonGiao = DanhMucTypePrefix + 'TonGiao',

  DthsDonViTiepNhan = DanhMucTypePrefix + 'DthsDonViTiepNhan'
}

/**
 * Cấu hình theo DanhMucType
 */
export interface DanhMucAPIMap {
  [DanhMucType.DanToc]: ApiResponseQtud<DanhMucQtud[]>;
  [DanhMucType.TonGiao]: ApiResponseQtud<DanhMucQtud[]>;

  [DanhMucType.DthsDonViTiepNhan]: ApiResponseDths<DanhMucDths[]>;
}

type UnwrapDanhMuc<T> = T extends ApiResponseQtud<infer R> ? R : T extends ApiResponseDths<infer R> ? R : never;

export type DanhMucMap = {
  [K in keyof DanhMucAPIMap]: UnwrapDanhMuc<DanhMucAPIMap[K]>;
};

export interface DanhMucMapBase extends Partial<DanhMucQtud>, Partial<DanhMucDths> {}

export type ParamsMapValues = Partial<Record<DanhMucType[number], ParamValues>>;

/**
 * Params và cấu hình bổ sung cho từng query theo DanhMucType
 */
export interface ParamValues extends z.infer<typeof ParamsValues_Schema> {}
const ParamsValues_Schema = BaseRequest_Schema.extend({
  extraUrl: z.string().optional(),
  extraOptions: QueryOptions_Schema.optional()
});

/**
 * Cấu hình cơ bản cho từng query theo DanhMucType
 */
export interface DanhMucConfig extends z.infer<typeof DanhMucConfig_Schema> {}
const DanhMucConfig_Schema = z.object({
  defaultUrl: z.string(),
  defaultParams: BaseRequest_Schema.optional(),
  defaultOptions: QueryOptions_Schema.optional()
});
//#endregion

export interface DanhMucQtud {
  id: string;
  name: string;
  code: string;
  status: number;
  statusName: string;
  description: string;
  displayName: string;
  order: string;
}

export interface DanhMucNguonLap extends DanhMucQtud {
  codeSecurity?: string;
  codePolice?: string;
}

export interface DanhMucHeLucLuong extends DanhMucQtud {
  cqdt_tw: string;
  cqdt_dp: string;
}

export interface DanhMucDiaDiem extends DanhMucQtud {
  fullName?: string;
  classify: string;
  areaAdministrativeParentCode?: string;
  endDate?: string;
}

export interface ChiTietDiaDiem {
  village: DanhMucDiaDiem;
  district: DanhMucDiaDiem;
  province: DanhMucDiaDiem;
  fullName: string;
}

//#region Used
export interface DanhMucGioiTinh extends DanhMucQtud {}
export interface DanhMucDanToc extends DanhMucQtud {}
export interface DanhMucQuocTich extends DanhMucQtud {}
export interface DanhMucNgheNghiep extends DanhMucQtud {}
export interface DanhMucTrinhDoVanHoa extends DanhMucQtud {}
export interface DanhMucThanhPhanGiaDinh extends DanhMucQtud {}
export interface DanhMucPhanLoaiDangVien extends DanhMucQtud {}
//#endregion

export interface DanhMucTonGiao extends DanhMucQtud {}

export interface DanhMucCapBac extends DanhMucQtud {}
export interface DanhMucChucVu extends DanhMucQtud {}

//#region Dths
export interface DanhMucDths {
  ten: string;
  ma: string;
}

export interface DanhMucDthsDonViTiepNhan extends DanhMucDths {}
export interface DanhMucDthsNguonKhoiTo extends DanhMucQtud {}
//#endregion
