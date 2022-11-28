import { useAppSelector } from '../../hooks';
import { LoadingPage } from '../loading-page/loading-page';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { MainPageAuth } from '../main-page-auth/main-page-auth';
import { MainPageNoAuth } from '../main-page-no-auth/main-page-no-auth';
import { getIsLoading } from '../../store/offer-data/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';

function MainPage(): JSX.Element {
  const isLoading = useAppSelector(getIsLoading);
  const authStatus = useAppSelector(getAuthStatus);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    authStatus === AuthorizationStatus.Auth ? <MainPageAuth /> : <MainPageNoAuth />
  );
}

export default MainPage;
