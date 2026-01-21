import { AxiosRequestConfig } from 'axios';

// Used to store the identity and cancel function stor for each request
const pendingMap = new Map<string, AbortController>();

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&');
};

/**
 * add request
 * @param config request configuration
 */
function addRequestSignal(config: AxiosRequestConfig): void {
  abortRequest(config);
  const url = getPendingUrl(config);
  const controller = new AbortController();
  config.signal = config.signal || controller.signal;
  if (!pendingMap.has(url)) {
    // If the current request is not pending, add it to the pending
    pendingMap.set(url, controller);
  }
}

/**
 * Clear all pending requests
 */
function abortAllRequest() {
  pendingMap.forEach((abortController) => {
    if (abortController) {
      abortController.abort();
    }
  });
  pendingMap.clear();
}

/**
 * Removal request
 * @param config request configuration
 */
function abortRequest(config: AxiosRequestConfig): void {
  if (!config) {
    return;
  }
  const url = getPendingUrl(config);
  if (pendingMap.has(url)) {
    // If the current request is pending, cancel it and remove it from the pending
    const abortController = pendingMap.get(url);
    if (abortController) {
      abortController.abort(url);
    }
    pendingMap.delete(url);
  }
}

export { abortAllRequest, abortRequest, addRequestSignal, getPendingUrl };
