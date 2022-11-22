import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import './error-message.css';

export function ErrorMessage(): JSX.Element {
  const error = useAppSelector((state) => state.error);

  return error
    ? <div className="error-message">{error}</div>
    : <Fragment> </Fragment>;
}
