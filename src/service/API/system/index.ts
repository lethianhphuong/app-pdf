import { BaseResponse } from '../types';
import { webHttp } from '@/service';

export const getServerDatetime = async () => {
  return webHttp.get<BaseResponse<string>>(
    { url: '/api/system-time' },
    {
      errorMessageMode: 'none'
    }
  );
};
