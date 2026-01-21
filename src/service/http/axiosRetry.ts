import { AxiosInstance } from 'axios';
import { HttpError, HttpRequestConfig } from './types';

interface AxiosRetryError extends HttpError {
  config: HttpRequestConfig & { __retryCount?: number };
}
export class AxiosRetry {
  retry(axiosInstance: AxiosInstance, error: AxiosRetryError) {
    const { config } = error;
    const requestOptions = config['requestOptions'];

    if (!requestOptions?.retryRequest) return;
    const { waitTime, count } = requestOptions.retryRequest;

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    // After the request returns, the config header is incorrect, causing the retry request to fail. Delete the returned headers and use the default headers
    delete config.headers;
    return this.delay(waitTime).then(() => axiosInstance(config));
  }

  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
