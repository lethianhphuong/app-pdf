import { useQuery } from '@tanstack/react-query';
import { mapObjMethod } from './useGetCommonDanhMuc';
import { getDanhMucQuery } from '@/service/API/danhmuc';

interface QueryParams {
  key: string;
  level?: null | number;
  params?: { [key: string]: string | number | boolean };
  options?: {
    [key: string]: any;
  };
  // onSuccessCallback?: (data: ApiListResponse<CommonList>) => void;
  // onErrorCallback?: (error: Error) => void;
}

const mapKeysParams = (obj: Record<string, any>): string => {
  let sortParams = '';
  if (obj != null) {
    for (const key of Object.keys(obj)) {
      sortParams += '_' + key + ':' + obj[key];
    }
  }

  return sortParams;
};

export const useGetCommon = ({ key, params, options }: QueryParams) => {
  const configRequest = {
    retry: 1, // Số lần gọi lại khi bị error
    cacheTime: 24 * 60 * 60 * 1000, // 1 ngày
    staleTime: 24 * 60 * 60 * 1000, // 1 ngày
    ...options

    // refetchOnMount: true, // Gọi lại API khi mount nếu dữ liệu stale
    // refetchOnWindowFocus: true, // Gọi lại API khi quay lại tab
    // enabled // true => load khi có params thay đổi
  };

  const dataMethod = mapObjMethod(key);

  const QUERY_KEY = [key, params && mapKeysParams(params)];
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => {
      return getDanhMucQuery(dataMethod.url, { ...dataMethod.params, ...params }).then((res) => {
        return res.data;
      });
    },
    ...configRequest
  });
};
