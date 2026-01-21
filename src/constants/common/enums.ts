/**
 * Lưu các constants dùng chung cho tất cả các phần mềm
 * Enum file - tên dùng PascalCase, giá trị chữ Hoa
 */

/**
 * Mẫu enum
 */
export enum UserSampleCmRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER'
}

export const SERVICE_API = {
  DOI_TUONG: '/v1/doituong/',
  NVCB_SEARCH: '/v1/nvcb-search/'
};
