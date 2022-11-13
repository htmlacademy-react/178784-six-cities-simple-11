import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MainPage, { MainProps } from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import { AppRouters } from '../../router/app-routers';

function App(props: MainProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRouters.MAIN} element={<MainPage {...props} />} />
        <Route path={AppRouters.LOGIN} element={<LoginPage />} />
        <Route path={AppRouters.ROOM} element={<RoomPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
