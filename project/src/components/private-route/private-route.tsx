import { Navigate } from 'react-router-dom';
import { APIRoute } from '../../enums/api-route.enum';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';

type PrivatePageProps = {
  children: JSX.Element;
  authStatus: AuthorizationStatus;
}

function PrivateRoute({ children, authStatus }: PrivatePageProps): JSX.Element {
  return authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={APIRoute.Login} />;
}

export default PrivateRoute;
