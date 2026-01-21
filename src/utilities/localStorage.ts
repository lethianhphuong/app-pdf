export const ACCESS_TOKEN = 'access-token';
export const AUTHENTICATOR = 'mkt-authen';

export const setStorageByName = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
};

export const getStorageByName = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item;
};

export const removeStorageByName = (key: string) => {
  window.localStorage.removeItem(key);
};

export const clearAllStorage = () => {
  window.localStorage.clear();
};

// authen by localStorage

export const getAuthenticator = () => {
  const item: any = window.localStorage.getItem(AUTHENTICATOR);
  return JSON.parse(item);
};

export const setAuthenticator = (value: any) => {
  setStorageByName(AUTHENTICATOR, JSON.stringify(value));
};

export const clearAccessToken = () => {
  window.localStorage.removeItem(AUTHENTICATOR);
};
