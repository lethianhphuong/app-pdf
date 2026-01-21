import type { AxiosError, AxiosResponse } from 'axios';
import { BackendErrorResult, ErrorMessageMode, RequestError } from './types';
import { message, notification } from '@/staticAlert';

type ErrorStatus = keyof typeof ERROR_STATUS;

/** Request timeout */
export const REQUEST_TIMEOUT = 60 * 1000;

/** The display time of the error message */
export const ERROR_MSG_DURATION: number = 3;

/** Default request error code */
export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT';

/** Default request error text */
export const DEFAULT_REQUEST_ERROR_MSG = 'Yêu cầu lỗi!';

/** Request timeout error code (fixed value: ECONNABORTED) */
export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED';

/** Request timeout error text */
export const REQUEST_TIMEOUT_MSG = 'Hết thời gian yêu cầu!';

/** Network unavailable code */
export const NETWORK_ERROR_CODE = 'NETWORK_ERROR';

/** Network unavailable error text */
export const NETWORK_ERROR_MSG = 'Đường truyền không khả dụng!';

/** Errors in various statuses of unsuccessful requests */
export const ERROR_STATUS = {
  400: '400: Lỗi gói tin không hợp lệ~',
  401: '401: Phiên đăng nhập hết hạn~',
  403: '403: Máy chủ từ chối truy cập~',
  404: '404: Tài nguyên không tồn tại~',
  405: '405: Phương thức truy cập không khả dụng~',
  408: '408: Hết thời gian yêu cầu~',
  499: '499: Dịch vụ đang bị chặn bởi phần mềm diệt virus, xin vui lòng tải lại trang',
  500: '500: Máy chủ gặp sự cố~',
  501: '501: The server does not implement the requested function~',
  502: '502: Bad Gateway~',
  503: '503: Hệ thống đang triển khai, vui lòng chờ trong ít phút',
  504: '504: Gateway timeout~',
  505: '505: The http version does not support this request~',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG
};

/** Code that does not pop up an error message */
export const NO_ERROR_MSG_CODE: Common.StringOrNumber[] = [];

/** Error message stack to prevent the same error from appearing at the same time */
const errorMsgStack = new Map<Common.StringOrNumber, string>([]);

function addErrorMsg(error: RequestError) {
  errorMsgStack.set(error.code, error.msg);
}
function removeErrorMsg(error: RequestError) {
  errorMsgStack.delete(error.code);
}
function hasErrorMsg(error: RequestError) {
  return errorMsgStack.has(error.code);
}

/**
 * show error message
 * @param error
 */
export function showErrorMsg(error: RequestError, errorMessageMode: ErrorMessageMode = 'notification') {
  if (!error.msg || hasErrorMsg(error) || errorMessageMode === 'none') return;

  addErrorMsg(error);
  window.console.warn(error.code, error.msg);
  if (errorMessageMode === 'message') {
    message?.error(error.msg, ERROR_MSG_DURATION);
  } else if (errorMessageMode === 'notification') {
    notification?.error({ message: error.msg, duration: ERROR_MSG_DURATION });
  }
  setTimeout(() => {
    removeErrorMsg(error);
  }, ERROR_MSG_DURATION);
}

/**
 * Strategy mode
 * @param actions each possible action
 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}

/**
 * Handle the error of axios request failure
 * @param axiosError - the error
 */
export function handleAxiosError(axiosError: AxiosError, errorMessageMode: ErrorMessageMode = 'message') {
  const error: RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };

  const actions: Common.StrategyAction[] = [
    [
      // network error
      !window.navigator.onLine || axiosError.message === 'Network Error',
      () => {
        Object.assign(error, {
          code: NETWORK_ERROR_CODE,
          msg: NETWORK_ERROR_MSG
        });
      }
    ],
    [
      // timeout error
      axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('timeout'),
      () => {
        Object.assign(error, {
          code: REQUEST_TIMEOUT_CODE,
          msg: REQUEST_TIMEOUT_MSG
        });
      }
    ],
    [
      // handle error from BE
      Boolean((axiosError.response?.data as BackendErrorResult)?.message),
      () => {
        if (axiosError.response?.data) {
          const backendError = handleBackendError(axiosError.response.data);
          Object.assign(error, backendError);
        }
      }
    ],
    [
      // Unsuccessful request error
      Boolean(axiosError.response),
      () => {
        const errorCode: ErrorStatus = (axiosError.response?.status as ErrorStatus) || 'DEFAULT';

        const msg = ERROR_STATUS[errorCode];
        Object.assign(error, { code: errorCode, msg });
      }
    ]
  ];

  exeStrategyActions(actions);

  showErrorMsg(error, errorMessageMode);

  return error;
}

/**
 * Handle errors after a successful request
 * @param response - the response to the request
 */
export function handleResponseError(response: AxiosResponse) {
  const error: RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };

  if (!window.navigator.onLine) {
    // network error
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
  } else {
    // The status code of the successful request is not 200 error
    const errorCode: ErrorStatus = response.status as ErrorStatus;
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
    Object.assign(error, { type: 'http', code: errorCode, msg });
  }

  showErrorMsg(error);

  return error;
}

/**
 * Handle errors returned by the backend (business errors)
 * @param data - the response data of the backend interface
 */
export function handleBackendError(data: any) {
  const error: RequestError = {
    type: 'backend',
    code: data['code'],
    msg: data['message']
  };

  return error;
}
