import { DonViApi } from '..';
import { PageParams } from '../types';
import {
  AccountTypeEnums,
  AdminOrUserEnums,
  CapDonViEnums,
  DanhMucStatus,
  FetchUsersStrategyEnums,
  HeLucLuongEnums,
  TrucThuocCoQuanHoSoEnums
} from '@/constants/business/enums';

export interface AuthModel {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_info: string;
}

export interface UserInfo {
  detail: UserInfoDetail;
}

export interface ChuKy {
  account: string;
  signImg: string;
  signImgName: string;
}

export interface UserInfoDetail extends Omit<UserBasic, 'name' | 'status' | 'statusName'> {
  //TODO: check to delete unused fields

  fullName: string;
  dignity: string; //TODO: update enum
  policeNumber: string;
  phone: string;
  organizationParent: string; //TODO: update enum
  organizationParentName: string;
  organizationLevel: CapDonViEnums;
  organizationLevelCode: string;
  gender: string; //TODO: update enum
  genderName: string;
  sign: string;
  isLocal: number;
  provinceCode: string;
  province: string;
  bds_province: string;
  v06: TrucThuocCoQuanHoSoEnums; //TODO: update enum
  pv01: string; //TODO: update enum
  leaderCadres: AccountTypeEnums;
  accountType: AdminOrUserEnums;
  directManager: string;
  orgFb: number; //TODO: update enum
  /**
   * @field `nameAcronym` tên đơn vị viết tắt
   */
  nameAcronym: string;
  /**
   * @field `nameAcronymD` tên đơn vị cha viết tắt
   */
  nameAcronymD: string;
  updateAt: string;
  listAccountDetailOrgTop: AccountDetailOrgTop[];
  timeOut: string;
  forceSystem: HeLucLuongEnums;
  roleMap: number; //TODO: update enum
  passwordStart: string;
  investigativeAgencyType: number; //TODO: update enum
  expiredNotificationDate: Date;
  expirationDate: Date;
  statusConfirmInfo: number; //TODO: update enum
  virtualUser: number; //TODO: update enum
  birthDate?: string;
  address?: string;
  academicLevel?: string;
  politicalLevel?: string;
  signature?: string;
  signImg?: string;
  districtCode?: string;
  district?: string;
  bds_district?: string;
  villageCode?: string;
  village?: string;
  bds_village?: string;
  groupCode?: string;
  reasonRefuse?: string;
  /**
   * @field `chuKy` frontend tự sinh
   */
  chuKy?: string;
  /**
   * @field `heLucLuong` frontend tự sinh
   */
  heLucLuong?: string;
  /**
   * @field `isV01OrPV01` frontend tự sinh
   */
  isV01OrPV01?: boolean;
  /**
   * @field `isCanBoCapXaHoacDon` frontend tự sinh để kiểm tra cán bộ cấp xã hoặc đồn
   */
  isCanBoCapXaHoacDon?: boolean;
  /**
   * @field `dviQuanLy` frontend tự sinh để lấy tiêu đề đơn vị quản lý trong biểu mẫu
   */
  dviQuanLy?: string;
  /**
   * @field `dviCapTren` frontend tự sinh để lấy tiêu đề đơn vị cấp trên trong biểu mẫu
   */
  dviCapTren?: string;
  /**
   * @field `dviCB` frontend tự sinh để lấy tên đơn vị cán bộ từ cấp nhỏ đến cấp lớn để hiển thị trong biểu mẫu
   */
  dviCB?: string;
  /**
   * @field `donViCascader` frontend tự sinh để lấy defaultLabel cho cascader đơn vị
   */
  donViCascader?: string;
  /**
   * @field `diaDiem` frontend tự sinh để lấy địa điểm dùng trong biểu mẫu
   */
  diaDiem?: string;
  /**
   * @field `donViUser` frontend tự sinh để lấy fullData đơn vị người dùng
   */
  donViUser?: DonViApi.DonVi;
  /**
   * @field `listOrganizationManage` danh sách đơn vị mà tài khoản quản lý
   */
  listOrganizationManage?: { name: string; organization: string }[];
}

export interface AccountDetailOrgTop {
  id?: string;
  username: string;
  accountName: string;
  organizationCode?: string;
  organizationName?: string;
  type?: string; //TODO: update enum
}

export interface UserAction {
  action: string;
  name: string;
}

export interface UserConfig {
  actions: UserAction[];
  permissions: string[];
  listMenuUrl?: string[];
  menuRoles?: UserMenuItem[];
  menuByRole?: UserMenuTreeItem[];
}

export interface UserMenuItem {
  id: string;
  name: string;
  code: string;
  typeMenu: number;
  url?: string;
  iconCls?: string;
  component?: string;
  parentCode?: string;
}

export interface UserMenuTreeItem extends Omit<UserMenuItem, 'parentCode'> {
  selectable?: boolean;
  leaf?: boolean;
  parentCode?: string;
  children?: UserMenuTreeItem[];
}

export interface UserBasic {
  id: string;
  name: string;
  account: string;
  organization: string;
  organizationName: string;
  position: string;
  positionName: string;
  military?: string;
  militaryName?: string;
  status: string;
  statusName: string;
  policeNumber?: string;
  phone?: string;
}

export interface LanhDao extends Omit<UserBasic, 'name' | 'account' | 'id' | 'military' | 'position'> {
  accountId: string;
  accountName: string;
  username: string;
  militaryCode: string;
  positionCode: string;
}

export interface ParamsSearchLanhDao {
  position?: string;
  org?: string;
}

export interface PasswordRule {
  key: string;
  text: string;
  description?: string;
  filter?: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

export interface Role {
  id: string;
  code: string;
  name: string;
  description: string;
  app: string;
  status: DanhMucStatus;
}

export interface ParamsGetDanhSachTaiKhoanNguoiDung extends Partial<UserBasic> {
  keySearch?: string;
  organization?: string;
  organizationRank?: string;
  account?: string;
  name?: string;
  position?: string;
}

export interface GetDanhSachTaiKhoanProps {
  type?: FetchUsersStrategyEnums;
  size?: number;
  org?: string;
}

export interface PhanMemTruyCap {
  code: string;
  logo: string;
  name: string;
  order?: string;
  parentCode?: string;
  url?: string;
}

export interface ParamsGetCanBoByDonVi extends PageParams {
  organization?: string;
  keySearch?: string;
}
