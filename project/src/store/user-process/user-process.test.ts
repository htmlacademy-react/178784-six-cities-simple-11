import { AuthorizationStatus } from '../../enums/authorization-status.enum';
import { makeFakeUser } from '../../mocks/mocks';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction } from '../api-actions';
import { userProcess } from './user-process';

const initialState: UserProcess = {
  authStatus: AuthorizationStatus.Unknown,
  user: null
};


describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ ...initialState });
  });

  it('should auth and set user if checkAuthAction fulfilled', () => {
    const state = { ...initialState };
    const user = makeFakeUser();
    expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: user}))
      .toEqual({...initialState, authStatus: AuthorizationStatus.Auth, user: user });
  });

  it('should not auth if checkAuthAction rejected', () => {
    const state = { ...initialState };
    expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
      .toEqual({...initialState, authStatus: AuthorizationStatus.NoAuth });
  });

  it('should auth and set user if login fulfilled', () => {
    const state = { ...initialState };
    const user = makeFakeUser();
    expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: user}))
      .toEqual({...initialState, authStatus: AuthorizationStatus.Auth, user: user });
  });

  it('should not auth if login rejected', () => {
    const state = { ...initialState };
    expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
      .toEqual({...initialState, authStatus: AuthorizationStatus.NoAuth });
  });

});
