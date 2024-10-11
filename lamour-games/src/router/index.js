import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { routes } from './routes';
import Spinner from '../components/Spinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ShopPage = lazy(() => import('../pages/ShopPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const UserProfilePage = lazy(() => import('../pages/UserProfilePage'));
const DiscordCallback = lazy(() => import('../pages/DiscordCallback'));

export const Router = () => {
  return (
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<HomePage />} />;
            <Route path={routes.about} element={<AboutPage />}/>;
            <Route path={routes.shop} element={<ShopPage />}/>;
            <Route path={routes.login} element={<LoginPage />}/>;
            <Route path={routes.signup} element={<SignupPage />}/>;
            <Route path={routes.resetPassword} element={<ResetPasswordPage />}/>;
            <Route path={routes.userProfile} element={<UserProfilePage />}/>;
            <Route path={routes.discordCallback} element={<DiscordCallback />}/>;
          </Routes>
        </BrowserRouter>
      </Suspense>
  );
};
