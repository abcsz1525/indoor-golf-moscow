import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders a useful 404 and prevents indexing', async () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /на главную/i })).toHaveAttribute('href', '/');
    await waitFor(() => {
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    });
  });
});
