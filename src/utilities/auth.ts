import dayjs from 'dayjs';
import { clearAllStorage } from '@/components/Business/ModalChromeVersion/helpers';
import { LOCAL_STORAGE } from '@/constants/common/map';
import { ssoUrl } from '@/service';
import { modal } from '@/staticAlert';

export const logoutExpired = () => {
  modal.warning({
    title: 'Phiên làm việc đã hết hạn',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByAuthCodeExpired = () => {
  modal.warning({
    title: 'Tài khoản của bạn đã bị đăng xuất trên một thiết bị khác',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByEventLogoutReceived = () => {
  modal.warning({
    title: 'Tài khoản của bạn đã bị đăng nhập hoặc đăng xuất trên một thiết bị khác',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByGetMeFail = () => {
  modal.warning({
    title: 'Lấy thông tin tài khoản thất bại',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const getRemainWorkingTimes = () => {
  const expiredDateStr = localStorage.getItem(LOCAL_STORAGE.EXPIRES_IN);
  if (!expiredDateStr) return;
  const currentTime = dayjs();
  const remainWorkingTimes = dayjs(expiredDateStr).diff(currentTime, 'minute');
  return remainWorkingTimes;
};

export const logout = () => {

  console.log('logout');

  // clearAllStorage();
  // sessionStorage.clear();
  // const logoutURL = `${ssoUrl}/logout`;
  // window.location.href = logoutURL;
};
