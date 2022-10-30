import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Places, { PlacesProps } from '../../pages/places/places';
import Room from '../../pages/room/room';

function App(props: PlacesProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Places {...props} />}/>
          <Route path="login/" element={<Login />} />
          <Route path="offer/">
            <Route path=":id" element={<Room />}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
