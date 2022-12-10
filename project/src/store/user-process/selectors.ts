import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { NameSpace } from '../../enums/name-spaces.enum';
import { UserData } from '../../types/auth-data';
import { State } from '../../types/state';
import { Nullable } from '../../types/types';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authStatus;
export const getUser = (state: State): Nullable<UserData> => state[NameSpace.UserProcess].user;
