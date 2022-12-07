import { render, screen } from '@testing-library/react';
import { makeFakeHost } from '../../mocks/mocks';
import { WithHostProps } from '../../types/props';
import Host from './host';

describe('Host component', () => {
  it('Should be show pro host', () => {
    const proHost = makeFakeHost(true);
    const props: WithHostProps = {
      host: proHost
    };
    render(
      <Host {...props}>
      </Host>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(proHost.name)).toBeInTheDocument();
    expect(screen.getByText(/pro/i)).toBeInTheDocument();
  });

  it('Should be show not pro host', () => {
    const notProHost = makeFakeHost(false);
    const props: WithHostProps = {
      host: notProHost
    };
    render(
      <Host {...props}>
      </Host>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(notProHost.name)).toBeInTheDocument();
    expect(screen.queryByText(/pro/i)).not.toBeInTheDocument();
  });
});
