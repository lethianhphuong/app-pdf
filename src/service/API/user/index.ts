import { BaseResponse, PageResponse } from '../types';
import {
  AuthModel,
  ChangePasswordParams,
  ChuKy,
  GetDanhSachTaiKhoanProps,
  LanhDao,
  ParamsGetCanBoByDonVi,
  ParamsGetDanhSachTaiKhoanNguoiDung,
  ParamsSearchLanhDao,
  PasswordRule,
  PhanMemTruyCap,
  Role,
  UserBasic,
  UserConfig,
  UserInfo,
  UserInfoDetail
} from './types';
import { env } from '@/config/env';
import { FetchUsersStrategyEnums } from '@/constants/business/enums';
import { personHttp, qtudHttp, ssoHttp, webHttp } from '@/service';
import { omitNil } from '@/utilities/object';

export type {
  AuthModel,
  UserInfo,
  UserConfig,
  UserBasic,
  ParamsSearchLanhDao,
  LanhDao,
  UserInfoDetail,
  Role,
  ParamsGetCanBoByDonVi
};
export const APP_CODE = `${env.APP_CODE}`;

export const getTokenByAuthCode = (authCode: string) => {
  return ssoHttp.get<AuthModel>({ url: '/token', params: { authCode: authCode } });
};

export const getMe = () => {
  return qtudHttp.get<BaseResponse<UserInfo>>(
    { url: '/api/v1/account/get-me' },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getMeByAccount = (account: string) => {
  return webHttp.get<BaseResponse<UserInfo>>({
    url: 'getMe/getMeByAccount',
    params: {
      account: account
    }
  });
};

export const getIdByUsername = (userName: string) => {
  return webHttp.get<BaseResponse<ChuKy>>({ url: `/getIdByUsername/${userName}` });
};

export const getUserConfig = () => {
  return qtudHttp.get<BaseResponse<UserConfig>>(
    { url: `/api/v1/permission/fe?appCode=${APP_CODE}` },
    {
      errorMessageMode: 'none'
    }
  );
};

export const searchCanBoDonViDangNhapByKeySearch = async ({
  keySearch,
  page,
  size
}: {
  organization?: string;
  keySearch?: string;
  page: number;
  size: number;
}) => {
  return webHttp.get<PageResponse<UserBasic>>({
    url: '/danh-muc/list-lead-by-org',
    params: omitNil({
      page,
      size,
      keySearch: keySearch,
      type: FetchUsersStrategyEnums.LanhDaoCanBoVaCapDuoi
    })
  });
};

export const searchCanBoByKeySearchAndOrg = async ({
  keySearch,
  page,
  size,
  organization
}: {
  organization?: string;
  keySearch?: string;
  page: number;
  size: number;
}) => {
  // return webHttp.get<PageResponse<UserBasic & { fullName: string }>>({
  return personHttp.get<PageResponse<Omit<UserBasic, 'name'> & { fullName: string }>>({
    // url: '/danh-muc/list-lead-by-org-ban-giao',
    // url: '/api/v1/account/list-lead-by-org',
    // url: '/api/v1/account/all',
    url: '/api/v1/account/in-list-org',
    params: omitNil({
      page,
      size,
      keySearch: keySearch,
      org: organization
      // organization,
      // type: FetchUsersStrategyEnums.LanhDaoCanBoVaCapDuoi
    })
  });
};

export const searchCanBoByDonVi = async ({ keySearch, page, size, organization }: ParamsGetCanBoByDonVi) => {
  return personHttp.get<PageResponse<UserBasic>>({
    url: '/api/v1/account/list-lead-by-org',
    params: omitNil({
      page,
      size,
      keySearch: keySearch,
      org: organization,
      type: FetchUsersStrategyEnums.LanhDaoVaCanBo
      // positionType: AccountTypeEnums.CanBo
    })
  });
};

export const searchCanBoByDonViChiaSe = async ({
  keySearch,
  page,
  size,
  organization,
  rootOrg
}: ParamsGetCanBoByDonVi & { rootOrg?: string }) => {
  return webHttp.get<PageResponse<UserBasic>>({
    url: '/tvnv/get-list-user',
    params: omitNil({
      page,
      size,
      keySearch: keySearch,
      code: organization,
      rootOrg
    })
  });
};

export const getUsersByAccount = async ({ account }: { account: string }) => {
  return personHttp.get<PageResponse<UserBasic>>({
    url: 'api/v1/account/list',
    params: { page: 0, size: 100, account: account }
  });
};

export const getAllLanhDaosOfOrg = async (params: { organization: string }) => {
  return personHttp.get<PageResponse<UserBasic>>({ url: '/api/v1/account/list-account-lead-by-org', params });
};

export const getPasswordRules = () => {
  return personHttp.get<BaseResponse<PasswordRule[]>>({
    url: 'api/v1/general-config/password-rules'
  });
};

export const changePassword = (params: ChangePasswordParams) => {
  return personHttp.put<BaseResponse<any>>({
    url: 'api/v1/account/change-pw',
    params: params
  });
};

export const getNhomQuyenCuaTaiKhoan = () => {
  return personHttp.get<PageResponse<Role>>({
    url: '/api/v1/role-group/menu/list'
  });
};

export const getDanhSachTaiKhoanNguoiDung = async (params: ParamsGetDanhSachTaiKhoanNguoiDung) => {
  return webHttp.get<PageResponse<UserBasic>>({
    url: '/danh-muc/account/list',
    params: omitNil({
      ...params,
      page: 0,
      size: 999
    })
  });
};

export const getDanhSachTaiKhoan = async ({
  type = FetchUsersStrategyEnums.LanhDaoVaCanBo,
  size = 99,
  org = undefined
}: GetDanhSachTaiKhoanProps) => {
  return webHttp.get<PageResponse<UserBasic>>({
    url: '/danh-muc/list-lead-by-org',
    params: { size, type, org }
  });
};

export const getDanhSachPhanMemTruyCap = async () => {
  return personHttp.get<BaseResponse<PhanMemTruyCap[]>>({
    url: 'api/v1/permission/apps'
  });
};
