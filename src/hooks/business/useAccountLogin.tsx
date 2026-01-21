import { RouterUrl } from '@/constants';
import { generateRoutes } from '@/routes';
import { UserMenuTreeItem } from '@/service/API/user/types';
import useUserStore from '@/store/zustand/useUserStore';
import { logout } from '@/utilities/auth';

export default function useAccountLogin() {
  const setUserData = useUserStore((state) => state.setUserData);

  const userInfo = useUserStore((state) => state.userInfo);
  const userConfig = useUserStore((state) => state.userConfig);
  const userRoles = useUserStore((state) => state.userRoles);

  const currentUser = userInfo;
  const currentNhomQuyen = userRoles;

  //#region Thêm menu thủ công
  const menuByRole = userConfig?.menuByRole || [];
  const newMenu = [];
  if (menuByRole) {
    // newMenu.push(menuByRole[0]);

    const menuConNguoi = {
      id: '65fe3fc2-1639-4f4c-977f-5f2179d14f88',
      name: 'Đối tượng',
      code: '01804',
      url: 'doi-tuong',
      iconCls: 'BarChartOutlined',
      typeMenu: 1,
      leaf: false,
      selectable: false,
      children: [
        {
          id: '7f000001-4586-15ec-8951-86e4147f1299',
          name: 'Con người',
          code: '01804999',
          url: RouterUrl.ConNguoi,
          typeMenu: 1,
          component: 'DS_ConNguoi',
          parentCode: '018043',
          leaf: true,
          selectable: true
        }
      ]
    };

    const menuVuAn = {
      id: '65fe3fc2-1639-4f4c-977f-5f2179d14fe6',
      name: 'Quản lý vụ án',
      code: '018043',
      url: 'quan-ly-vu-an',
      iconCls: 'BarChartOutlined',
      typeMenu: 1,
      leaf: false,
      selectable: false,
      children: [
        {
          id: '7f000001-4586-15ec-8951-86e4147f1216',
          name: 'Vụ án khởi tố',
          code: '018043004',
          url: RouterUrl.DsVuAn,
          typeMenu: 1,
          component: 'DSVuAnView',
          parentCode: '018043',
          leaf: true,
          selectable: true
        }
      ]
    };
    const menuPDF = {
      id: '65fe3fc2-1639-4f4c-977f-5f2179d14fe9',
      name: 'PDF',
      code: '018043',
      url: 'PDF',
      iconCls: 'BarChartOutlined',
      typeMenu: 1,
      leaf: false,
      selectable: false,
      component: 'DemoPdf',
    };
    newMenu.push(menuConNguoi);
    newMenu.push(menuVuAn);
    newMenu.push(menuPDF);
  }
  //#endregion

  const currentMenu = generateRoutes(newMenu);

  const plusRouteRaw: UserMenuTreeItem[] = [
    {
      id: '7f000001-4586-15ec-8951-86e4147f1220',
      name: 'Diễn biến vụ án',
      code: '018043004003',
      url: RouterUrl.DienBienVuAn,
      typeMenu: 2,
      component: 'DienBienVuAnView',
      parentCode: '018043004'
    }
  ];
  const plusRoute = generateRoutes(plusRouteRaw);

  function signOut() {
    setUserData({});
    logout();
  }

  return {
    currentUser,
    currentNhomQuyen,
    currentMenu,
    plusRoute,
    signOut
  };
}
