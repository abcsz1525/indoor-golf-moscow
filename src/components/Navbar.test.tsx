import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar mobile menu', () => {
  it('keeps the menu trigger visible on dark hero backgrounds and exposes its state', async () => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar onBooking={vi.fn()} />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: 'Открыть меню' });
    expect(trigger).toHaveClass('bg-brand-orange', 'text-neutral-950');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', 'mobile-navigation');

    await userEvent.click(trigger);

    expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.getElementById('mobile-navigation')).toBeInTheDocument();
  });
});
