/**
 * Lưu các constants cho business/nghiệp vụ
 * Map file - viết lowercase và suffix là Config, Map, Options
 */
import { DoMat } from './enums';

/**
 * Mẫu map
 */
export const colorSampleMap = {
  success: 'blue',
  error: 'red',
  warning: 'yellow'
};

/**
 * Mẫu Options
 */
export const statusSampleOptions = [
  { value: '001', label: 'active' },
  { value: '002', label: 'inactive' },
  { value: '003', label: 'pending' }
];

//#region Map

//#endregion

//#region Options

export const donViKienNghiKhoiToVuAnOptions = [
  { value: '001', label: 'Cơ quan Thanh tra' },
  { value: '002', label: 'Kiểm toán Nhà nước' },
  { value: '003', label: 'Khác' }
];

export const trangThaiVuAnOptions = [
  { value: '023', label: 'Đang tạo' },
  { value: '014-028-029-036', label: 'Đang điều tra' },
  { value: '025-031', label: 'Đã kết luận' },
  { value: '015', label: 'Tạm đinh chỉ' },
  { value: '024-016-030-002', label: 'Đã kết thúc' },
  { value: '017', label: 'Chờ tiếp nhận' }
];

export const DoMatOptions = {
  [DoMat.KhongMat]: {
    label: 'Không Mật',
    value: DoMat.KhongMat
  },
  [DoMat.Mat]: {
    label: 'Mật',
    value: DoMat.Mat
  },
  [DoMat.ToiMat]: {
    label: 'Tối Mật',
    value: DoMat.ToiMat
  }
  // [DoMat.TuyetMat]: {
  //   label: 'Tuyệt Mật',
  //   value: DoMat.TuyetMat
  // }
};

//#endregion
