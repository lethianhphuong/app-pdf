import { DanhMucAPIMap, DanhMucConfig, DanhMucType } from './types';
import { danhMucUrl, dthsUrl } from '@/service';

type fetcherMap = Record<DanhMucType[number], <T extends DanhMucType>(type: T, res: DanhMucAPIMap[T]) => any>;

/**
 * Cấu hình theo DanhMucType
 * Response trả về
 */
export const fetchers: fetcherMap = {
  [DanhMucType.DanToc]: fetchDanhMucQtud,
  [DanhMucType.TonGiao]: fetchDanhMucQtud,

  [DanhMucType.DthsDonViTiepNhan]: fetchDanhMucDths
};

//#region Funtion fetch response trả về theo DanhMucType
function fetchDanhMucQtud<T extends DanhMucType>(type: T, res: DanhMucAPIMap[T]) {
  if ('messageCode' in res) {
    if (res?.messageCode && res?.messageCode == '200') {
      return res?.data?.list;
    }
  }
  console.log('fetchDanhMucQtud error', type, res);
  return [];
}

function fetchDanhMucDths<T extends DanhMucType>(type: T, res: DanhMucAPIMap[T]) {
  if ('success' in res) {
    if (res?.success) {
      return res?.data;
    }
  }
  console.log('fetchDanhMucQtud error', type, res);
  return [];
}
//#endregion

//#region DanhMucConfig
/**
 * Khai báo một số biến mặc định cho danh mục (url, defaultParams, defaultOptions)
 */
const DanhMucConfigMap: Record<DanhMucType, DanhMucConfig> = {
  [DanhMucType.DanToc]: {
    defaultUrl: '/v1/qtud-category/api/v1/area-administrative'
  },
  [DanhMucType.TonGiao]: {
    defaultUrl: danhMucUrl + '/api/v1/religion/list'
  },

  [DanhMucType.DthsDonViTiepNhan]: {
    defaultUrl: dthsUrl + '/don-vi/chuyen-don-vi-thu-ly/'
  }
};

export function getDanhMucConfig<T extends DanhMucType>(type: T): DanhMucConfig {
  const config = DanhMucConfigMap[type];

  /// Một số cấu hình mặc định
  if (!config?.defaultParams) {
    config.defaultParams = {};
  }
  config.defaultParams.page = 0;
  config.defaultParams.size = 1000;

  return config;
}
//#endregion
