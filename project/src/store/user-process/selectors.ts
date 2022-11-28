import { NameSpace } from '../../constants/const';
import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { State } from '../../types/state';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authStatus;
