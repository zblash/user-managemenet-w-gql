import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UILoaderComponent } from '@/components/loading';
import { UIHeaderComponent } from '@/components/header';

const HomePage = React.lazy(() => import('./home').then(module => ({ default: module.HomePage })));
const EditUserPage = React.lazy(() => import('./edit-user').then(module => ({ default: module.EditUserPage })));
const CreateUserPage = React.lazy(() => import('./create-user').then(module => ({ default: module.CreateUserPage })));
const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));

interface IRoute {
  path: string;
  basePath: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
}

export const RoutesList: IRoute[] = [
  { path: '/', basePath: '/', component: HomePage },
  { path: '/create-user', basePath: '/create-user', component: CreateUserPage },
  { path: '/edit-user/:userId', basePath: '/edit-user', component: EditUserPage },
];

const Routes = React.memo(() => {
  return (
    <>
      <UIHeaderComponent />
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={<UILoaderComponent />}>
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
