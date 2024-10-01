import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { routes } from './routes';
import Spinner from '../components/Spinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ShopPage = lazy(() => import('../pages/ShopPage'))
export const Router = () => {
  return (
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<HomePage />} />;
            <Route path={routes.about} element={<AboutPage />}/>;
            <Route path={routes.shop} element={<ShopPage />}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
  );
};
