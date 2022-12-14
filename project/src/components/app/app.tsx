import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import { AppRoute } from '../../router/app-routers';
import { useAppSelector } from '../../hooks';
import { getIsLoading } from '../../store/offer-data/selectors';
import { LoadingPage } from '../../pages/loading-page/loading-page';
import { getAuthStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = authStatus !== AuthorizationStatus.Unknown;
  const isLoading = useAppSelector(getIsLoading);
  if (!isAuthChecked || isLoading) {
    return <LoadingPage />;
  }

  return (

    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />}/>
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Room} element={<RoomPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
}

export default App;
