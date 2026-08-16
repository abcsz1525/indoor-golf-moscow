import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Location } from './Location';

describe('Location', () => {
  it('does not contact Yandex Maps until the visitor explicitly requests the map', async () => {
    render(
      <MemoryRouter>
        <Location />
      </MemoryRouter>,
    );

    expect(screen.queryByTitle('Indoor Golf Moscow — Лужники')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Показать карту' }));

    expect(screen.getByTitle('Indoor Golf Moscow — Лужники')).toHaveAttribute(
      'src',
      expect.stringContaining('yandex.ru/map-widget'),
    );
  });
});
