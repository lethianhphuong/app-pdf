import dayjs from 'dayjs';
import { env } from '@/config/env';
import { LOCAL_STORAGE } from '@/constants/common/map';
import { UserApi } from '@/service/API';
import { APP_CODE, Role } from '@/service/API/user';
import useLoadingStore from '@/store/zustand/useLoadingStore';
import useUserStore from '@/store/zustand/useUserStore';
import { getRemainWorkingTimes, logout, logoutByGetMeFail } from '@/utilities/auth';
import { isDev } from '@/utilities/env';

export default function useAuth() {
  const setUserData = useUserStore((state) => state.setUserData);
  const startAuthLoading = useLoadingStore((state) => state.startAuthLoading);
  const stopAuthLoading = useLoadingStore((state) => state.stopAuthLoading);

  async function createAuthState(authCode?: Nullable<string>) {
    if (!authCode) {
      await _initUser();
    } else {

      const checkEnvDaoTao = onCheckEnvDaoTao();
      const checkEnvLocal = onCheckEnvLocal();
      const checkUrlDaotao = true;
      if (checkEnvDaoTao || (checkEnvLocal && checkUrlDaotao)) {
        await _fetchTokenR2();
      }
      else {
        await _fetchToken(authCode);
      }
    }
  }

  const onCheckEnvDaoTao = () => {
    let url = window.location.href;
    let checkURL = url.indexOf('daotao.csdlnv') != -1;
    return checkURL ? true : false;
  };

  const onCheckEnvLocal = () => {
    let url = window.location.href;
    let checkURL = url.indexOf('local') != -1;
    return checkURL ? true : false;
  };


  const _fetchToken = async (authCode: string) => {
    try {
      startAuthLoading();
      const res = await UserApi.getTokenByAuthCode(authCode);
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, `Bearer ${res.access_token}`);
      const expired = dayjs().add(res.expires_in, 'second').toISOString();
      localStorage.setItem(LOCAL_STORAGE.EXPIRES_IN, `${expired}`);
      localStorage.setItem(LOCAL_STORAGE.AUTH_CODE, `${authCode}`);
      await _initUser();
    } catch (error) {
      console.log(error);
    } finally {
      stopAuthLoading();
    }
  };

  const _fetchTokenR2 = async () => {
    try {
      startAuthLoading();

      let url = new URL(window.location.href);

      let authCode = localStorage.getItem('authCode');
      let accessToken = localStorage.getItem('accessToken');
      let expire = localStorage.getItem('expire');

      //#region Local
      const checkEnv = onCheckEnvLocal();
      if (checkEnv) {
        authCode = url.searchParams.get('authCode');
        accessToken = url.searchParams.get('accessToken');
        expire = url.searchParams.get('expire');
      }
      //#endregion

      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, `Bearer ${accessToken}`);
      const expired = dayjs().add(expire, 'second').toISOString();
      localStorage.setItem(LOCAL_STORAGE.EXPIRES_IN, `${expired}`);
      localStorage.setItem(LOCAL_STORAGE.AUTH_CODE, `${authCode}`);
      await _initUser();
    } catch (error) {
      console.log(error);
    } finally {
      stopAuthLoading();
    }
  };

  const _initUser = async () => {
    const remainWorkingTimes = getRemainWorkingTimes();

    if (remainWorkingTimes && remainWorkingTimes < 60) {
      logout();
      return;
    }

    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    const authCode = localStorage.getItem(LOCAL_STORAGE.AUTH_CODE);
    const maybeTokenUndefined = 'Bearer undefined';

    if (!token || !authCode || token === maybeTokenUndefined) {
      logout();
      return;
    }

    try {
      startAuthLoading();
      await _getMe();
      !isDev && (await _savingAppVersion());
    } catch (error) {
      console.log(error);
    } finally {
      stopAuthLoading();
    }
  };

  const _getMe = async () => {
    try {
      const userInfoRes = await UserApi.getMe();
      const userInfo = userInfoRes?.data?.detail;

      const userConfigRes = await UserApi.getUserConfig();
      const userConfig = userConfigRes?.data;

      const userRolesRes = await UserApi.getNhomQuyenCuaTaiKhoan();
      const userRoles = userRolesRes?.data?.list;

      setUserData({
        userInfo,
        userConfig,
        userRoles
      });

      _kiemTraQuyen(userRoles);
    } catch (error) {
      // logoutByGetMeFail();
    }
  };

  const _kiemTraQuyen = (userRoles: Role[]) => {
    const kiemTraQuyen = userRoles?.find((role) => role.app === APP_CODE);
    // if (!kiemTraQuyen) {
    //   window.location.href = isDev ? env.API_URL_SSO : window.location.origin;
    // }
  };

  const _savingAppVersion = async () => {
    try {
      const response = await fetch(`./version.json`);
      const serverVersionResponse = await response.json();
      localStorage.setItem('appVersion', serverVersionResponse.hash);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAuthState
  };
}
