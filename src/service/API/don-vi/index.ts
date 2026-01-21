import { BaseResponse, PageResponse } from '../types';
import { DonVi } from './types';
import { DanhMucStatus, DonViLevelEnums, SubsystemEnums } from '@/constants/business/enums';
import { danhMucHttp, webHttp } from '@/service';
import { omitNil } from '@/utilities/object';

export type { DonVi };

export const getDanhSachDonVi = ({
  page = 0,
  size = 9999,
  keySearch = undefined,
  organizationLevel = undefined,
  parentCode = undefined,
  code = undefined,
  unitLevel = undefined,
  unitLevels = undefined
}: any) => {
  return danhMucHttp.get<PageResponse<DonVi>>({
    url: '/api/v1/organization/get-by-key-search',
    params: omitNil({
      page,
      size,
      keySearch,
      organizationLevel,
      parentCode,
      code,
      unitLevel,
      unitLevels,
      status: DanhMucStatus.Enabled
    })
  });
};

export const getDanhSachDonViChiaSe = ({
  page = 0,
  size = 9999,
  keySearch = undefined,
  organizationLevel = undefined,
  parentCode = undefined,
  code = undefined,
  unitLevel = undefined,
  unitLevels = undefined,
  chiaSeToanDonVi = false,
  rootOrg = undefined
}: any) => {
  return webHttp.get<BaseResponse<DonVi[]>>({
    url: '/tvnv/get-list-org',
    params: omitNil({
      page,
      size,
      keySearch,
      organizationLevel,
      parentCode,
      code,
      unitLevel,
      unitLevels,
      status: DanhMucStatus.Enabled,
      chiaSeToanDonVi,
      rootOrg
    })
  });
};

export const getDanhSachDonViAnNinh = ({
  page = 0,
  size = 150,
  keySearch = undefined,
  organizationLevel = undefined,
  parentCode = undefined,
  code = undefined,
  unitLevel = undefined,
  unitLevels = undefined
}: any) => {
  return danhMucHttp.post<PageResponse<DonVi>>({
    url: '/api/v1/organization/all/filter-by-subsystem',
    data: omitNil({
      page,
      size,
      keySearch,
      organizationLevel,
      parentCode,
      code,
      level: unitLevel,
      levels: unitLevels,
      status: DanhMucStatus.Enabled,
      subSystem: SubsystemEnums.AnNinh
    })
  });
};

export const getChiTietDonVi = (id: string) => {
  return danhMucHttp.get<BaseResponse<DonVi>>({ url: `/api/v1/organization/getByCode`, params: { code: id } });
};

export const getDanhSachDonViByLevel = (level: DonViLevelEnums, parentCode?: string) => {
  return danhMucHttp.get<PageResponse<DonVi>>({
    url: '/api/v1/organization/by-level',
    params: omitNil({ level, parentCode, size: 999, status: DanhMucStatus.Enabled })
  });
};

export const getCauHinhDonVi = (maDonVi: string) => {
  return danhMucHttp.get<BaseResponse<{ forceSystem?: string }>>({
    url: `/api/v1/config-org/detail/${maDonVi}`
  });
};
