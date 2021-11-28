import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));

interface IRoute {
  path: string;
  basePath: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
  isPrivate: boolean;
}

export const RoutesList: IRoute[] = [];

const Routes = React.memo(() => {
  return (
    <>
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={'Loading'}>
          <Switch>
            {RoutesList.map(route => (
              <Route key={route.path} path={route.path} component={route.component} exact />
            ))}
            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </div>
    </>
  );
});

export default Routes;
