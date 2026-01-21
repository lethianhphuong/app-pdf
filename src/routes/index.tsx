import { lazy } from 'react';
import { BookOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import * as AntdIcons from '@ant-design/icons';
import { MenuItem } from '@/layout/SiderBar/types';
import { UserApi } from '@/service/API';

const PageException = lazy(() => import('../pages/PageException/index'));

export const componentMap: { [x: string]: any } = {
  Dashboard: lazy(() => import('../pages/Dashboard')),

  DS_ConNguoi: lazy(() => import('../pages/ConNguoi/DS_ConNguoi')),
  DemoPdf: lazy(() => import('../pages/DemoPdf')),
  DSVuAnView: lazy(() => import('../pages/VuAn/DanhSachVuAn')),
  DienBienVuAnView: lazy(() => import('../pages/VuAn/TabVuAn')),

  DemoDocFormat: lazy(() => import('../pages/DemoDocFormat'))
};

export const bottomMenu: MenuItem[] = [
  {
    key: '/lich-su-cap-nhat',
    icon: <HistoryOutlined />,
    label: 'Lịch sử cập nhật',
    component: lazy(() => import('../pages/Dashboard'))
  },
  {
    key: '/huong-dan-su-dung',
    icon: <BookOutlined />,
    label: 'Hướng dẫn sử dụng',
    component: lazy(() => import('../pages/Dashboard'))
  },
  {
    key: '/tai-phan-mem-ky-so',
    icon: <DownloadOutlined />,
    label: 'Tải phần mềm ký số',
    component: lazy(() => import('../pages/Dashboard'))
  }
  // {
  //   key: '/tai-bao-cao-danh-gia',
  //   icon: <CloudDownloadOutlined />,
  //   label: 'Tải báo cáo, đánh giá',
  //   component: lazy(() => import('../pages/Dashboard'))
  // },
  // {
  //   key: '/cai-dat',
  //   icon: <SettingOutlined />,
  //   label: 'Cài đặt',
  //   children: [
  //     {
  //       key: '/cai-dat-giao-dien',
  //       label: 'Cài đặt màu sắc giao diện',
  //       component: lazy(() => import('../pages/Dashboard'))
  //     },
  //     {
  //       key: '/cai-dat-khac',
  //       label: 'Cài đặt khác',
  //       component: lazy(() => import('../pages/Dashboard'))
  //     }
  //   ]
  // }
];

export const generateRoutes = (menuByRole: UserApi.UserConfig['menuByRole']): MenuItem[] => {
  return (
    menuByRole?.map((item) => {
      //#region Xử lý nếu ko có dấu /
      let url = item?.url;
      if (item?.url?.indexOf('/') == -1) {
        url = '/' + item?.url;
      }
      //#endregion

      return {
        key: url || '',
        label: item.name,
        children: item.children ? generateRoutes(item.children) : undefined,
        component: item.component ? _loadComponent(item.component) : undefined,
        icon: item.iconCls ? <CustomIcon type={item.iconCls} /> : undefined,
        code: item.code
      };
    }) ?? []
  );
};

const _loadComponent = (componentName: string) => {
  const importFunc = componentMap[componentName];
  if (!importFunc) {
    return PageException;
  }

  return importFunc;
};

const CustomIcon = ({ type }: { type: string }) => {
  const AntdIcon = (AntdIcons as any)[type];
  return AntdIcon && <AntdIcon />;
};
