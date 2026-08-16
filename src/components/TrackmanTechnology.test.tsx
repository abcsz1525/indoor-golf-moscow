import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrackmanTechnology } from './TrackmanTechnology';

describe('TrackmanTechnology', () => {
  it('presents Trackman 4 and the first Trackman iO installation in Russia', () => {
    render(<TrackmanTechnology />);

    expect(screen.getByRole('heading', { name: 'Trackman 4' })).toBeInTheDocument();
    expect(screen.getAllByText('Trackman iO').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: 'Первая система Trackman iO в России' }),
    ).toBeInTheDocument();
    expect(screen.getByText('до 4600 fps')).toBeInTheDocument();
    expect(screen.getByText('Мгновенный результат')).toBeInTheDocument();
  });
});
