import { store } from '../store';
import { setErrorAction } from '../store/action';
import { clearErrorAction } from '../store/api-actions';

export const processErrorHandler = (message: string) => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
