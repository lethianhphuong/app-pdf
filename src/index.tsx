import React, { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { App as AntdApp, ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { enableMapSet } from 'immer';
import { isNumber } from 'lodash';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { env } from './config/env';
import './index.css';
import { store } from './store';
import { Providers } from './utilities/provider';

enableMapSet();
loadSecurityFilterChain();

function loadSecurityFilterChain() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramAuthCode = urlParams.get('authCode');
  const localAuthCode = localStorage.getItem('authCode');
  const authCodeExist = !!(paramAuthCode || localAuthCode);
  const logoutUrl = `${window.location.origin}/logout`;
  if (!authCodeExist) {
    console.log('loadSecurityFilterChain - logout');
    // window.location.href = logoutUrl;
    return;
  }

  const expiresIn = localStorage.getItem('expires_in');
  if (!expiresIn) return;
  const expiresInDt = new Date(expiresIn);
  if (isNaN(expiresInDt.getTime())) return;

  const currentDateTime = new Date().getTime();
  if (expiresInDt.getTime() < currentDateTime) window.location.href = logoutUrl;
}

library.add(fas);
dayjs.extend(quarterOfYear).locale('vi');

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const MainApp = () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};

window.addEventListener('vite:preloadError', async (event) => {
  event.preventDefault();
  let reloadCount: number;

  if (!localStorage.getItem('fetchFailed') || !isNumber(localStorage.getItem('fetchFailed'))) {
    reloadCount = 0;
  } else {
    reloadCount = Number(localStorage.getItem('fetchFailed'));
  }

  if (reloadCount >= 3) {
    if (confirm('Kết nối máy chủ thất bại, vui lòng tải lại trang!')) {
      // window.location.reload();
    }
    return;
  }

  reloadCount += 1;
  localStorage.setItem('fetchFailed', `${reloadCount}`);
  // window.location.reload();
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        locale={viVN}
        theme={{
          token: {
            colorPrimary: '#2B5654',
            colorSuccess: '#52C41A',
            colorWarning: '#FAAD14',
            colorError: '#A9081C',
            colorInfo: '#2F49FF',
            colorLink: '#8A2BE2',
            colorBgLayout: '#E5E5E5',
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Roboto, sans-serif',
            controlHeight: 28
          },
          components: {
            Menu: {
              darkItemBg: 'var(--gt-base-color)',
              darkPopupBg: 'var(--gt-base-color)',
              darkSubMenuItemBg: 'var(--gt-base-color)',
              darkItemColor: '#f7f7f7',
              darkItemSelectedBg: 'var(--gt-active-bg-color)',
              darkItemHoverColor: 'var(--gt-hover-text-color)',
              iconSize: 18,
              collapsedIconSize: 18
            },
            Layout: {
              siderBg: '#122827',
              motionDurationMid: '500ms'
            },
            Table: {
              borderColor: 'var(--gt-border-color)',
              headerBg: '#CBEACA',
              rowSelectedBg: 'rgb(219,235,221)',
              rowSelectedHoverBg: 'rgb(219,235,221)',
              headerColor: '#075843',
              headerBorderRadius: 0,
              cellPaddingBlockSM: 4,
              headerSortActiveBg: 'var(--gt-active-sort-bg-color)',
              headerSortHoverBg: undefined
            },
            Button: {
              borderRadius: 3,
              defaultShadow: 'none',
              primaryShadow: 'none',
              dangerShadow: 'none'
            },
            Descriptions: {
              titleMarginBottom: 4
            },
            Progress: {
              defaultColor: 'rgb(27, 82, 79)',
              colorSuccess: 'rgb(0, 164, 126)'
            }
          }
        }}
      >
        <AntdApp>
          <MainApp />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
