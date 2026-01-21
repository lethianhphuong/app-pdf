import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Requested error type:
 * - axios: axios error: network error, request timeout, default catch-all error
 * - http: the request is successful, and the response http status code is not a 200 error
 * - backend: The request is successful, the HTTP status code of the response is 200, and the business error defined by the backend
 */
export type RequestErrorType = 'axios' | 'http' | 'backend';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | 'notification';
export type SuccessMessageMode = ErrorMessageMode;

/** request error */
export interface RequestError {
  /** The error export type of the requested service */
  type: RequestErrorType;
  /** error code */
  code: string | number;
  /** error message */
  msg: string;
}

export interface BackendErrorResult {
  [key: string]: any;
  type: string;
  code: string;
  message?: string;
}

/** Data structure configuration returned by the backend export interface */
export interface BackendResultConfig {
  /** Indicates the attribute field of the backend request status code */
  codeKey: string;
  /** Indicates the attribute field of the backend request data */
  dataKey: string;
  /** Indicates the attribute field of the backend message */
  msgKey: string;
  /** The status of the successful request defined on the backend business */
  successCode: number | string;
}

/** mock response option */
export interface MockOption {
  url: Record<string, any>;
  body: Record<string, any>;
  query: Record<string, any>;
  headers: Record<string, any>;
}

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // Request splicing path
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  // ignore duplicate requests
  ignoreDuplicateRequest?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // request retry mechanism
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

export interface HttpError extends Error {
  config: HttpRequestConfig;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  transformResponseHook?: (res: AxiosResponse, options: RequestOptions) => any;
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
  requestInterceptors?: (request: HttpRequestConfig) => void;
  responseInterceptors?: (response: AxiosResponse) => Promise<AxiosResponse>;
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: HttpError) => any;
}

export interface UploadFileParams {
  // Other parameters
  data?: Recordable<any>;
  // File parameter export interface field name
  name?: string;
  // file name
  filename?: string;
  [key: string]: any;
}
