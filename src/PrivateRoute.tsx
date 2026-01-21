// PrivateRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';
import { getAuthenticator } from './utilities/localStorage';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
  routes: [];
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { routes } = props;
  const isAuthen = !!getAuthenticator();

  return (
    <Routes>
      {routes.map((prop: any, key: number) => {
        if (prop.children) {
          return prop.children.map((view: any, viewKey: any) => (
            <Route
              path={view.url}
              key={viewKey}
              element={isAuthen ? view.component : <Navigate to='/login' replace />}
            ></Route>
          ));
        } else {
          return (
            <Route path={prop.url} key={key} element={isAuthen ? prop.component : <Navigate to='/login' replace />} />
          );
        }
      })}
    </Routes>
    // <Route
    //   element={isAuthen ? <Component /> : <Navigate to="/signin" replace />}
    //   {...rest}
    // />
  );
};

export default PrivateRoute;
