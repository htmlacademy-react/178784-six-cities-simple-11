import { useAppSelector } from '../../hooks';
import { LoadingPage } from '../loading-page/loading-page';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { MainPageAuth } from '../main-page-auth/main-page-auth';
import { MainPageNoAuth } from '../main-page-no-auth/main-page-no-auth';

function MainPage(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);
  const authStatus = useAppSelector((state) => state.authStatus);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    authStatus === AuthorizationStatus.Auth ? <MainPageAuth /> : <MainPageNoAuth />
  );
}

export default MainPage;
