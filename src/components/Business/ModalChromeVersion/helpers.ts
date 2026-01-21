import { LOCAL_STORAGE } from '@/constants/common/map';

export const clearAllStorage = () => {
  const checkedBrowser = window.localStorage.getItem(LOCAL_STORAGE.CHECKED_BROWSER);
  window.localStorage.clear();
  checkedBrowser && window.localStorage.setItem(LOCAL_STORAGE.CHECKED_BROWSER, checkedBrowser);
};
