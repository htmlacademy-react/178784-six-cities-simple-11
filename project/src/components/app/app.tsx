import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import { AppRoute } from '../../router/app-routers';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { useAppSelector } from '../../hooks';
import { getIsLoading } from '../../store/offer-data/selectors';
import { LoadingPage } from '../../pages/loading-page/loading-page';
import { getAuthStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = authStatus !== AuthorizationStatus.Unknown;
  const isLoading = useAppSelector(getIsLoading);
  if (!isAuthChecked || isLoading) {
    return <LoadingPage />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.MAIN}
          element={
            <PrivateRoute authStatus={authStatus}>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.ROOM}
          element={
            <PrivateRoute authStatus={authStatus}>
              <RoomPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
