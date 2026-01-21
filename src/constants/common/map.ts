/**
 * Lưu các constants dùng chung cho tất cả các phần mềm
 * Map file - viết lowercase và suffix là Config, Map, Options
 */
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { BaseDatePickerProps, BaseRangePickerProps } from '@/components/Atoms';

dayjs.extend(quarterOfYear).locale('vi');

/**
 * Mẫu map
 */
export const colorSampleCommonMap = {
  success: 'blue',
  error: 'red',
  warning: 'yellow'
};

/**
 * Mẫu Options
 */
export const statusSampleCommonOptions = [
  { value: '001', label: 'active' },
  { value: '002', label: 'inactive' },
  { value: '003', label: 'pending' }
];

//#region Layout
export const defaultBreadcumbs = [
  { label: 'Thông báo', key: '/notification' },
  { label: 'Email', key: '/mailpage' },
  { label: 'Phản ánh', key: '/feedback_management' }
];
//#endregion

//#region Storage
export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  EXPIRES_IN: 'expires_in',
  AUTH_CODE: 'authCode',
  COLLAPSED_MENU: 'collapsedMenu',
  SCHEDULE_ON: 'scheduleOn',
  CHECKED_BROWSER: 'checkedBrowser',
  INTERNET_SPEED: 'internet_speed',
  RECORD_LOGIN: 'record_login'
};

export const SESSION_STORAGE = {
  DANH_MUC: 'danhMuc',
  SERIAL_NUMBER: 'serialNumber'
};
//#endregion

//#region Date
export const pastRangePresets: BaseRangePickerProps['presets'] = [
  { label: 'Tuần này', value: [dayjs().startOf('week'), dayjs()] },
  {
    label: 'Tuần trước',
    value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')]
  },
  { label: 'Tháng này', value: [dayjs().startOf('month'), dayjs()] },
  {
    label: 'Tháng trước',
    value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  },
  { label: 'Quý này', value: [dayjs().startOf('quarter'), dayjs()] },
  {
    label: 'Quý trước',
    value: [dayjs().subtract(1, 'quarter').startOf('quarter'), dayjs().subtract(1, 'quarter').endOf('quarter')]
  },
  { label: 'Năm này', value: [dayjs().startOf('year'), dayjs()] },
  {
    label: 'Năm trước',
    value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
  }
];

export const futureRangePresets: BaseRangePickerProps['presets'] = [
  { label: 'Tuần này', value: [dayjs(), dayjs().endOf('week')] },
  {
    label: 'Tuần tới',
    value: [dayjs().add(1, 'week').startOf('week'), dayjs().add(1, 'week').endOf('week')]
  },
  { label: 'Tháng này', value: [dayjs(), dayjs().endOf('month')] },
  {
    label: 'Tháng tới',
    value: [dayjs().add(1, 'month').startOf('month'), dayjs().add(1, 'month').endOf('month')]
  },
  { label: 'Quý này', value: [dayjs(), dayjs().endOf('quarter')] },
  {
    label: 'Quý tới',
    value: [dayjs().add(1, 'quarter').startOf('quarter'), dayjs().add(1, 'quarter').endOf('quarter')]
  },
  { label: 'Năm này', value: [dayjs(), dayjs().endOf('year')] },
  {
    label: 'Năm tới',
    value: [dayjs().add(1, 'year').startOf('year'), dayjs().add(1, 'year').endOf('year')]
  }
];

export const pastDatePresets: BaseDatePickerProps['presets'] = [
  { label: 'Hôm nay', value: dayjs() },
  { label: 'Hôm qua', value: dayjs().subtract(1, 'day') },
  { label: 'Tuần trước', value: dayjs().subtract(1, 'week') },
  { label: 'Tháng trước', value: dayjs().subtract(1, 'month') },
  { label: 'Quý trước', value: dayjs().subtract(1, 'quarter') },
  { label: 'Năm trước', value: dayjs().subtract(1, 'year') }
];

export const futureDatePresets: BaseDatePickerProps['presets'] = [
  { label: 'Hôm nay', value: dayjs() },
  { label: 'Ngày mai', value: dayjs().add(1, 'day') },
  { label: 'Tuần tới', value: dayjs().add(1, 'week') },
  { label: 'Tháng tới', value: dayjs().add(1, 'month') },
  { label: 'Quý tới', value: dayjs().add(1, 'quarter') },
  { label: 'Năm tới', value: dayjs().add(1, 'year') }
];
//#endregion

//#region Rule
export const maxLengthConfig = {
  /**@xxs 20 */
  xxs: 20,
  /**@ss 50 */
  ss: 50,
  /**@xs 100 */
  xs: 100,
  /**@sm 255 */
  sm: 255,
  /**@md 500 */
  md: 500,
  /**@lg 1000 */
  lg: 1000,
  /**@xl 4000 */
  xl: 4000
};

export const minLengthConfig = {
  /**@sm 5 */
  sm: 5,
  /**@md 10 */
  md: 10
};
//#endregion
