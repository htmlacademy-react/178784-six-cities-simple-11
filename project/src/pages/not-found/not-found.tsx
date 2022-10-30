import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className='not-found-container'>
      <p>404 Not Found</p>
      <Link to="/" >Перейти на главную</Link>
    </div>
  );
}

export default NotFound;
