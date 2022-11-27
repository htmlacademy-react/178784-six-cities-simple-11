import { toast } from 'react-toastify';
import { NameSpace } from '../../constants/const';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { UserData } from '../../types/auth-data';
import { State } from '../../types/state';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authStatus;
export const getUser = (state: State): UserData => {
  const user = state[NameSpace.UserProcess].user;
  if (user === null) {
    const error = 'Could not get user';
    toast.error(error);
    throw new Error(error);
  }
  return user;
};
