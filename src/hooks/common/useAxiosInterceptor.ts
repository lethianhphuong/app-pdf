import { webHttpLoading } from '@/service';
import useLoadingStore from '@/store/zustand/useLoadingStore';

export const useAxiosInterceptor = () => {
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  webHttpLoading.getInstance().interceptors.request.use(
    (req) => {
      startLoading();
      return req;
    },
    (error) => {
      stopLoading();
      return Promise.reject(error);
    }
  );
  webHttpLoading.getInstance().interceptors.response.use(
    (res) => {
      stopLoading();
      return res;
    },
    (error) => {
      stopLoading();
      return Promise.reject(error);
    }
  );
};
