import { Suspense, createElement, lazy, useEffect, useMemo, useRef } from 'react';
import { Layout } from 'antd';
import {
  Outlet,
  Route,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Footer from './Footer';
import Headers from './Header';
import { HeaderRef } from './Header/types';
import SiderBar from './SiderBar';
import { MenuItem, SideBarRef } from './SiderBar/types';
import LoadComponentFallback from '@/components/Atoms/LoadComponentFallback';
import { CollapsedStatusEnums } from '@/constants/business/enums';
import { LOCAL_STORAGE } from '@/constants/common/map';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { bottomMenu, componentMap } from '@/routes';
import { getContextPath } from '@/utilities/common';

const PageException = lazy(() => import('../pages/PageException/index'));
const LichCongTac = lazy(() => import('../pages/LichCongTac/index'));
const Notification = lazy(() => import('../pages/Notification/index'));

const { Content } = Layout;
const contextPath = getContextPath();


// Định nghĩa kiểu dữ liệu cho tham số children là ReactNode
const PageLayout = () => {
  const sideBarRef = useRef<SideBarRef>(null);
  const headerRef = useRef<HeaderRef>(null);
  const user = useAccountLogin();

  const mainMenu = useMemo(() => {
    return user.currentMenu;
  }, [user.currentNhomQuyen, user.currentMenu]);

  useEffect(() => {
    const localStorageCollapseValue = localStorage.getItem(LOCAL_STORAGE.COLLAPSED_MENU);
    const convertedCollapseValueToBool = Boolean(localStorageCollapseValue && JSON.parse(localStorageCollapseValue));
    handleChangeCollapse(convertedCollapseValueToBool);
  }, []);

  function handleChangeCollapse(newState: boolean) {
    sideBarRef.current?.updateCollapse(newState);
    headerRef.current?.updateCollapse(newState);

    const newLocalStorageCollapseValue = (
      newState ? CollapsedStatusEnums.Collapsed : CollapsedStatusEnums.Expanded
    ).toString();
    localStorage.setItem(LOCAL_STORAGE.COLLAPSED_MENU, newLocalStorageCollapseValue);
  }

  return (
    <>
      <Layout style={{ height: 'calc(100vh - var(--gt-footer-height))' }}>
        <SiderBar ref={sideBarRef} mainMenu={mainMenu} bottomMenu={bottomMenu} />
        <Layout>
          <Headers ref={headerRef} onChange={handleChangeCollapse} />
          <Content className='m-0 p-0 rounded-none'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </>
  );
};

const BlankLayout = () => {

  return (
    <>
      <Layout>
        <Layout>
          <Content className='m-0 p-0 rounded-none'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const switchRoutes = (routes: MenuItem[]) =>
  createRoutesFromElements(
    <>
      <Route element={<BlankLayout />}>
        {/* <Route
          path='/'
          element={<Suspense fallback={<LoadComponentFallback />}>{createElement(componentMap.DemoDocFormat)}</Suspense>}
          errorElement={<PageException />}
        /> */}
        <Route
          path='/demo-doc-format'
          element={<Suspense fallback={<LoadComponentFallback />}>{createElement(componentMap.DemoDocFormat)}</Suspense>}
          errorElement={<PageException />}
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<LoadComponentFallback />}>
              <PageException notFound />
            </Suspense>
          }
        />
      </Route>

      <Route element={<PageLayout />}>
        <Route
          path='/'
          element={<Suspense fallback={<LoadComponentFallback />}>{createElement(componentMap.Dashboard)}</Suspense>}
          errorElement={<PageException />}
        />
        <Route
          path='/demo-doc'
          element={<Suspense fallback={<LoadComponentFallback />}>{createElement(componentMap.DemoDocFormat)}</Suspense>}
          errorElement={<PageException />}
        />
        <Route
          path='/mailpage'
          element={<Suspense fallback={<LoadComponentFallback />}></Suspense>}
          errorElement={<PageException />}
        />
        <Route
          path='/feedback_management'
          element={<Suspense fallback={<LoadComponentFallback />}></Suspense>}
          errorElement={<PageException />}
        />
        <Route
          path='/notification'
          element={
            <Suspense fallback={<LoadComponentFallback />}>
              <Notification />
            </Suspense>
          }
        />

        <Route
          path='/lich-cong-tac'
          element={
            <Suspense fallback={<LoadComponentFallback />}>
              <LichCongTac />
            </Suspense>
          }
        />
        {routes.map((prop: MenuItem, key: number) => {
          return (
            <Route
              path={`${prop.key}`}
              key={key}
              errorElement={<PageException />}
              element={
                prop.component && (
                  <Suspense fallback={<LoadComponentFallback />}>{createElement(prop.component)}</Suspense>
                )
              }
            ></Route>
          );
        })}
        {handleGenerateRouterRecursive(routes)}


      </Route>


    </>
  );

function handleGenerateRouterRecursive(routes: MenuItem[]): any {
  const finalRouters: RouteObject[] = [];
  routes.forEach((prop: MenuItem, key: number) => {
    if (prop.children) {
      finalRouters.push(handleGenerateRouterRecursive(prop.children));
    } else {
      finalRouters.push(
        (
          <Route
            path={`${prop.key}`}
            key={key}
            errorElement={<PageException />}
            element={
              prop.component && (
                <Suspense fallback={<LoadComponentFallback />}>{createElement(prop.component)}</Suspense>
              )
            }
          />
        ) as RouteObject
      );
    }
  });

  return finalRouters;
}
const AuthLayout: React.FC = () => {
  /**
   * logic dynamic router
   */
  const user = useAccountLogin();

  const router = useMemo(() => {
    return createBrowserRouter(switchRoutes([...user.currentMenu, ...user.plusRoute, ...bottomMenu]), {
      basename: `${contextPath}`
    });
  }, [user.currentMenu, bottomMenu, contextPath]);

  return <RouterProvider router={router} />;
};

export default AuthLayout;
