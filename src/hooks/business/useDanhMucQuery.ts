import { UseQueryResult, useQueries, useQuery } from '@tanstack/react-query';
import { fetchDanhMuc } from '@/service/API/danhmuc';
import { getDanhMucConfig } from '@/service/API/danhmuc/map';
import { DanhMucMap, DanhMucMapBase, DanhMucType, ParamValues, ParamsMapValues } from '@/service/API/danhmuc/types';

//#region CONSTANTS & DERIVED VALUES
/**
 * Options cơ bản cho toàn bộ query
 */
const baseOptions = {
  retry: 1,
  cacheTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
  staleTime: 1 * 24 * 60 * 60 * 1000
};
//#endregion

//#region UTILITY FUNCTIONS
/**
 * Hàm trả về url được cấu hình theo type
 * @param type
 * @returns
 */
function getConfigUrl(type: DanhMucType, params?: ParamValues) {
  const config = getDanhMucConfig(type);
  let url = config?.defaultUrl;
  if (params?.extraUrl) {
    url += params?.extraUrl;
  }
  return url;
}

/**
 * Hàm trả về param, gồm param truyền từ component + default param được cấu hình
 * @param type
 * @param paramsMap
 * @returns
 */
function getConfigParam(type: DanhMucType, params?: ParamValues) {
  const config = getDanhMucConfig(type);

  const newParams = Object.assign({}, params);
  if (newParams?.extraUrl) {
    delete newParams.extraUrl;
  }
  if (newParams?.extraOptions) {
    delete newParams.extraOptions;
  }

  if (!config?.defaultParams) {
    return newParams;
  } else {
    return { ...config?.defaultParams, ...newParams };
  }
}

/**
 * Hàm trả về param, gồm param truyền từ component + default param được cấu hình
 * @param type
 * @param paramsMap
 * @returns
 */
function getConfigOption(type: DanhMucType, params?: ParamValues) {
  const config = getDanhMucConfig(type);

  let options = { ...baseOptions };
  if (config?.defaultOptions) {
    options = { ...options, ...config?.defaultOptions };
  }
  if (params?.extraOptions) {
    options = { ...options, ...params?.extraOptions };
  }

  console.log('sấ', options);

  return options;
}
//#endregion

//#region HANDLERS
/**
 * Hàm query cho một danh mục
 * @param type
 * @param params
 * @returns
 */
export function useDanhMucQuery<T extends DanhMucType>(type: T, params?: ParamValues): UseQueryResult<DanhMucMap[T]> {
  /**
   * Mẫu
  const {
    data: danhMucDanToc,
    isLoading,
    isFetching
  } = useDanhMucQuery(DanhMucType.DanToc);
   */

  const QUERY_KEY = [type, getConfigUrl(type), getConfigParam(type, params)];
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return fetchDanhMuc(type, getConfigUrl(type), getConfigParam(type, params));
    },
    ...getConfigOption(type, params)
  }) as UseQueryResult<DanhMucMap[T]>;
}

/**
 * Hàm query cho nhiều danh mục
 * @param types
 * @param paramsMap
 * @returns
 */
export function useDanhMucQueryMulti<T extends readonly DanhMucType[]>(
  types: T,
  paramsMap?: ParamsMapValues
): {
  queryResults: Record<T[number], UseQueryResult<DanhMucMapBase[]>>;
  results: Record<T[number], DanhMucMapBase[]>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
} {
  /**
   * Mẫu
  const {
    danhMucDanToc: danhMucDanTocV2,
    danhMucTonGiao: danhMucTonGiao
  } = useDanhMucQueryMulti([DanhMucType.DanToc, DanhMucType.TonGiao], {
    [DanhMucType.DanToc]: { size: 5 },
    [DanhMucType.TonGiao]: { size: 10 }
  });
   */

  const queries = useQueries({
    queries: types.map((type) => ({
      queryKey: [type, getConfigUrl(type, paramsMap?.[type]), getConfigParam(type, paramsMap?.[type])],
      queryFn: async () => {
        return fetchDanhMuc(type, getConfigUrl(type, paramsMap?.[type]), getConfigParam(type, paramsMap?.[type]));
      },
      ...getConfigOption(type, paramsMap?.[type])
    }))
  });

  const queryEntries = types.map((t, i) => [t, queries[i]]);
  const queryResults = Object.fromEntries(queryEntries);

  const entries = types.map((t, i) => [t, queries[i]?.data]);
  const results = Object.fromEntries(entries);

  const isLoading = queries.some((r) => r.isLoading);
  const isFetching = queries.some((r) => r.isFetching);
  const isError = queries.some((r) => r.isError);

  return {
    queryResults,
    results,
    isLoading,
    isFetching,
    isError
  };
}
//#endregion
