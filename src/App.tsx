/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { Suspense, lazy, useEffect } from 'react';
import { Spin } from 'antd';
import { useIdleTimer } from 'react-idle-timer';
import ModalChromeVersion from './components/Business/ModalChromeVersion';
import UploadDocumentPanel from './components/Business/UploadDocumentPanel';
import { LOCAL_STORAGE } from './constants/common/map';
import { useAsyncEffect, useAxiosInterceptor } from './hooks';
import useAccountLogin from './hooks/business/useAccountLogin';
import useAuth from './hooks/business/useAuth';
import { NotificationApi } from './service/API';
import useStaticAlert from './staticAlert';
import useLoadingStore from './store/zustand/useLoadingStore';
import { logout } from './utilities/auth';
import AuthLayout from '@/layout';

const DelayLoad = lazy(() => import('../src/layout/DelayLoad'));

export function App() {
  useAxiosInterceptor();

  const currentUrl = new URL(window.location.href);
  const authCode = currentUrl.searchParams?.get(LOCAL_STORAGE.AUTH_CODE);
  const { createAuthState } = useAuth();
  const { currentUser } = useAccountLogin();

  const loading = useLoadingStore((state) => state.loading);

  useEffect(() => {
    //TODO: disable splashScreen
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.style.opacity = '0';
      const timeoutId = setTimeout(() => {
        splashScreen.remove();
        clearTimeout(timeoutId);
      }, 500);
    }
  }, []);

  useAsyncEffect(async () => {
    await fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      await createAuthState(authCode);
      if (authCode) {
        clearUrlSearchQuery();
      }
    } catch (_) {
      //
    } finally {
      //
    }
  };

  const clearUrlSearchQuery = () => {
    currentUrl.searchParams?.delete(LOCAL_STORAGE.AUTH_CODE);
    currentUrl.searchParams?.delete('expire');
    currentUrl.searchParams?.delete(LOCAL_STORAGE.ACCESS_TOKEN);
    window.history.replaceState(history.state, '', currentUrl.href);
  };

  useIdleTimer({
    timeout: 3600000,
    promptBeforeIdle: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
      'focus'
    ],
    onIdle: () => {
      handleLogout();
    }
  });

  const handleLogout = async () => {
    try {
      await NotificationApi.logoutNoti();
    } catch (_) {
      //
    } finally {
      logout();
    }
  };

  useStaticAlert();

  return (
    <>
      <div className='app'>
        <Spin spinning={loading} fullscreen style={{ zIndex: 3001 }} size='large' />
        {/* <UploadQueueProvider> */}
        <AuthLayout />
        {/* </UploadQueueProvider> */}
        <UploadDocumentPanel />
      </div>
      {currentUser && (
        <>
          <ModalChromeVersion />
        </>
      )}

      {/* Đoạn load syncfusion, css, vi */}
      <Suspense>
        <DelayLoad />
      </Suspense>
    </>
  );
}

App.propTypes = {};

export default App;
