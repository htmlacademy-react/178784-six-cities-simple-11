import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { MainPageAuth } from '../main-page-auth/main-page-auth';
import { MainPageNoAuth } from '../main-page-no-auth/main-page-no-auth';
import { getAuthStatus } from '../../store/user-process/selectors';

function MainPage(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthorizationStatus.Auth ? <MainPageAuth /> : <MainPageNoAuth />
  );
}

export default MainPage;
