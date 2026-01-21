import { QueryKey, UseQueryResult, useQueries } from '@tanstack/react-query';
import { Method } from 'axios';
import { DanhMucEnums, DanhMucStatus, DiaDiemEnums } from '@/constants';
import { getDanhMucQuery } from '@/service/API/danhmuc';
import { isArray } from '@/utilities/typeof';

type useGetCommonQueries = {
  key: DanhMucEnums;
  queryKey: QueryKey;
  options?: Record<string, any>;
  params?: Record<string, any>;
};

type useGetCommonDanhMucReturn = {
  resultsDanhMuc: Record<string, UseQueryResult<any, unknown>>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
};

type mapObjMethodReturn = {
  url: string;
  params?: Record<string, any>;
  method: Method;
};

export const mapObjMethod = (key: string): mapObjMethodReturn => {
  const newMethod: mapObjMethodReturn = {
    url: '',
    method: 'GET'
  };
  const params: Record<string, any> = {
    status: DanhMucStatus.Enabled,
    page: 0,
    size: 999
  };

  switch (key) {
    case DanhMucEnums.QuocTich:
      newMethod.url = '/v1/qtud-category/api/v1/country/list';
      break;
    case DanhMucEnums.DanToc:
      newMethod.url = '/v1/qtud-category/api/v1/nation/list';
      break;
    case DiaDiemEnums.QuanHuyen:
      newMethod.url = '/v1/qtud-category/api/v1/area-administrative';

      params.areaAdministrativeType = '002';
      break;
    case DiaDiemEnums.XaPhuong:
      newMethod.url = '/v1/qtud-category/api/v1/area-administrative';

      params.areaAdministrativeType = '003';
      break;
  }

  newMethod.params = params;

  return newMethod;
};

const QueryFn = async (item: useGetCommonQueries) => {
  const dataMethod = mapObjMethod(item.key);

  return getDanhMucQuery(dataMethod.url, dataMethod.params).then((res) => {
    return res.data;
  });
};

//#region Ví dụ
// VD 1:
//   const { resultsDanhMuc, isFetching } = useGetCommonDanhMuc([DanhMucEnums.DanToc, DanhMucEnums.QuocTich])
//   const { danhMucDanToc } = resultsDanhMuc
// VD 2:
//   const { resultsDanhMuc, isFetching } = useGetCommonDanhMuc([{key:DanhMucEnums.DanToc, queryKey:[DanhMucEnums.DanToc]}])
//   const { danhMucDanToc } = resultsDanhMuc

export const useGetCommonDanhMuc = (input: DanhMucEnums[] | useGetCommonQueries[]): useGetCommonDanhMucReturn => {
  const descriptors: useGetCommonQueries[] = isArray(input)
    ? (input as DanhMucEnums[]).map((x) => ({ key: x, queryKey: [x] }))
    : (input as useGetCommonQueries[]);

  const queriesConfig = descriptors.map((x) => ({
    queryKey: x.queryKey,
    queryFn: () => QueryFn(x),
    enabled: true,
    cacheTime: 24 * 60 * 60 * 1000, // 1 ngày
    staleTime: 24 * 60 * 60 * 1000, // 1 ngày
    ...x.options
  }));

  const resultsArr: UseQueryResult<any, unknown>[] = useQueries({ queries: queriesConfig });

  const results: Record<string, UseQueryResult<any, unknown>> = {};

  descriptors.forEach((dm, idx) => {
    results[dm.key] = resultsArr[idx].data || {};
  });

  const isLoading = resultsArr.some((r) => r.isLoading);
  const isFetching = resultsArr.some((r) => r.isFetching);
  const isError = resultsArr.some((r) => r.isError);

  return {
    resultsDanhMuc: results,
    isLoading,
    isFetching,
    isError
  };
};
