import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import { AppRoute } from '../../router/app-routers';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainPage />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.ROOM} element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
