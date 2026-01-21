import { BaseResponse } from '../types';
import { webHttp } from '@/service';

export const checkAuthCodeHealth = () => {
  return webHttp.get<BaseResponse<string>>(
    {
      url: '/api/health-check' // check authCode có còn hiệu lực không
    },
    {
      errorMessageMode: 'none'
    }
  );
};
