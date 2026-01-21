import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { cloneDeep, isFunction } from 'lodash';
import qs from 'qs';
import { abortRequest, addRequestSignal } from './axiosCanceler';
import { handleAxiosError } from './axiosError';
import { downloadByData, getFileNameFromResponse } from './helper';
import { HttpError, HttpRequestConfig, RequestOptions, UploadFileParams } from './types';

export class Http {
  constructor(config: HttpRequestConfig) {
    this.initConfig = config;
    this.axiosInstance = Axios.create(config);

    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** Save the current Axios instance object */
  private axiosInstance: AxiosInstance;

  /** Initialize the configuration object */
  private readonly initConfig: HttpRequestConfig;

  /** request interception */
  private httpInterceptorsRequest(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig): Promise<any> => {
        const ignoreDuplicateRequest = config.requestOptions?.ignoreDuplicateRequest ?? true;
        !ignoreDuplicateRequest && addRequestSignal(config);

        // Prioritize whether methods such as post/get pass in callbacks, otherwise execute callbacks such as initialization settings
        if (this.initConfig.requestInterceptors) {
          this.initConfig.requestInterceptors(config);
          return config;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** response interception */
  private httpInterceptorsResponse(): void {
    const instance = this.axiosInstance;
    instance.interceptors.response.use(
      (async (response) => {
        abortRequest(response.config);

        // Prioritize whether methods such as post/get pass in callbacks, otherwise execute callbacks such as initialization settings
        if (this.initConfig.responseInterceptors) {
          return this.initConfig.responseInterceptors(response);
        }

        return response;
      }) as (response: AxiosResponse) => Promise<AxiosResponse>,
      // handle error
      async (axiosError: HttpError) => {
        const { responseInterceptorsCatch } = this.initConfig;
        const config = axiosError.config || {};
        const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';

        if (Axios.isCancel(axiosError)) {
          return Promise.reject(axiosError);
        }

        if (responseInterceptorsCatch) {
          return responseInterceptorsCatch(this.axiosInstance, axiosError);
        }

        handleAxiosError(axiosError as AxiosError, errorMessageMode);
        // All response exceptions differentiate the source as cancellation request/non-cancellation request
        return Promise.reject(axiosError);
      }
    );
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.initConfig.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== 'application/x-www-form-urlencoded' ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === 'GET'
    ) {
      //TODO: check
      config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    };
  }

  public getInstance() {
    return this.axiosInstance;
  }

  /** General request utility function */
  public request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: HttpRequestConfig = cloneDeep(config);

    const { requestOptions, beforeRequestHook, transformResponseHook } = this.initConfig;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    // Handle custom request/response callbacks separately
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((response: AxiosResponse) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(response, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(response as unknown as Promise<T>);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** Separately extracted post tool function */
  public post<T>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' }, options);
  }

  /** Separately extracted get tool function */
  public get<T>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' }, options);
  }

  put<T>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' }, options);
  }

  delete<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' }, options);
  }

  uploadFile<T>(config: AxiosRequestConfig, params: UploadFileParams, options?: RequestOptions) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.request<T>(
      {
        ...config,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          ignoreCancelToken: true
        }
      },
      options
    );
  }

  async downloadFile(
    config: AxiosRequestConfig,
    opt: { fileName?: string; manual?: boolean; saveAs?: boolean } = { manual: false }
  ) {
    const response: AxiosResponse = await this.request(
      {
        method: 'GET',
        responseType: 'blob',
        ...config
      },
      { isReturnNativeResponse: true }
    );

    if (!opt?.manual) {
      const name = getFileNameFromResponse(response, opt?.fileName);
      await downloadByData(response.data, name, opt?.saveAs);
    }

    return response;
  }

  async downloadFileByPost(
    config: AxiosRequestConfig,
    opt: { fileName?: string; manual?: boolean; saveAs?: boolean } = { manual: false }
  ) {
    const response: AxiosResponse = await this.request(
      {
        method: 'POST',
        responseType: 'blob',
        ...config
      },
      { isReturnNativeResponse: true }
    );

    if (!opt?.manual) {
      const name = getFileNameFromResponse(response, opt?.fileName);
      await downloadByData(response.data, name, opt?.saveAs);
    }

    return response;
  }
}
