import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { EventsPage } from '../src/pages/EventsPage';
import { INVITATIONAL_2026_PHOTOS, INVITATIONAL_2026_ALBUM_URL } from '../src/data/invitational2026Photos';

// Фотоотчёт с Pro-Am турнира 04.09.2026 живёт на странице «События» под карточкой
// прошедшего события. Отобранные кадры хостятся на сайте (внешние галереи временные),
// полный архив — по ссылке на Яндекс Диск.

function renderEventsPage() {
  return render(
    <MemoryRouter initialEntries={['/events']}>
      <EventsPage />
    </MemoryRouter>,
  );
}

describe('tournament photo report on the events page', () => {
  it('has 16 curated photos with unique hosted files and alt texts', () => {
    expect(INVITATIONAL_2026_PHOTOS).toHaveLength(16);
    const files = new Set(INVITATIONAL_2026_PHOTOS.map((photo) => photo.src));
    expect(files.size).toBe(16);
    for (const photo of INVITATIONAL_2026_PHOTOS) {
      expect(photo.src).toMatch(/^\/img\/invitational-2026\/[a-z0-9-]+\.webp$/);
      expect(photo.thumb).toMatch(/^\/img\/invitational-2026\/[a-z0-9-]+-thumb\.webp$/);
      expect(photo.alt.length).toBeGreaterThan(10);
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it('renders the photo grid under the tournament card', () => {
    renderEventsPage();
    const report = screen.getByRole('region', { name: /фотоотчёт/i });
    const buttons = within(report).getAllByRole('button', { name: /открыть фото/i });
    expect(buttons).toHaveLength(16);
    expect(within(report).getAllByRole('img')).toHaveLength(16);
  });

  it('links to the full archive without a photographer credit', () => {
    renderEventsPage();
    const report = screen.getByRole('region', { name: /фотоотчёт/i });
    expect(within(report).queryByText(/фото:/i)).not.toBeInTheDocument();
    const link = within(report).getByRole('link', { name: /все фотографии/i });
    expect(link).toHaveAttribute('href', INVITATIONAL_2026_ALBUM_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('opens a lightbox on click, navigates with arrows and closes with Escape', async () => {
    const user = userEvent.setup();
    renderEventsPage();
    const report = screen.getByRole('region', { name: /фотоотчёт/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(within(report).getAllByRole('button', { name: /открыть фото/i })[0]);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', INVITATIONAL_2026_PHOTOS[0].src);
    expect(within(dialog).getByText(/1\/16/)).toBeInTheDocument();

    await user.keyboard('{ArrowRight}');
    expect(within(screen.getByRole('dialog')).getByRole('img')).toHaveAttribute(
      'src',
      INVITATIONAL_2026_PHOTOS[1].src,
    );

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('uses a real tournament photo as the card cover', () => {
    renderEventsPage();
    const [cover] = screen.getAllByRole('img', { name: /победители турнира/i });
    expect(cover).toHaveAttribute('src', expect.stringMatching(/^\/img\/invitational-2026\/.+\.webp$/));
  });
});
