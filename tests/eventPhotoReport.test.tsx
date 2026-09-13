import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { EventsPage } from '../src/pages/EventsPage';
import { INVITATIONAL_2026_ALBUMS, INVITATIONAL_2026_PHOTOS } from '../src/data/invitational2026Photos';

// Фотоотчёт с Pro-Am турнира 04.09.2026 живёт на странице «События» под карточкой
// прошедшего события. Микс двух фотографов, отобранные кадры хостятся на сайте (внешние
// галереи временные), полные архивы — по двум ссылкам под сеткой.

function renderEventsPage() {
  return render(
    <MemoryRouter initialEntries={['/events']}>
      <EventsPage />
    </MemoryRouter>,
  );
}

describe('tournament photo report on the events page', () => {
  it('has 24 curated photos from both photographers with unique hosted files', () => {
    expect(INVITATIONAL_2026_PHOTOS).toHaveLength(24);
    expect(INVITATIONAL_2026_PHOTOS.filter((p) => p.src.includes('/nv-')).length).toBeGreaterThanOrEqual(8);
    expect(INVITATIONAL_2026_PHOTOS.filter((p) => p.src.includes('/pi')).length).toBeGreaterThanOrEqual(8);
    const files = new Set(INVITATIONAL_2026_PHOTOS.map((photo) => photo.src));
    expect(files.size).toBe(24);
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
    expect(buttons).toHaveLength(24);
    expect(within(report).getAllByRole('img')).toHaveLength(24);
  });

  it('links to both photo archives without a photographer credit', () => {
    renderEventsPage();
    const report = screen.getByRole('region', { name: /фотоотчёт/i });
    expect(within(report).queryByText(/фото:/i)).not.toBeInTheDocument();
    expect(INVITATIONAL_2026_ALBUMS).toHaveLength(2);
    for (const album of INVITATIONAL_2026_ALBUMS) {
      const link = within(report).getByRole('link', { name: new RegExp(album.label) });
      expect(link).toHaveAttribute('href', album.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('opens a lightbox on click, navigates with arrows and closes with Escape', async () => {
    const user = userEvent.setup();
    renderEventsPage();
    const report = screen.getByRole('region', { name: /фотоотчёт/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(within(report).getAllByRole('button', { name: /открыть фото/i })[0]);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', INVITATIONAL_2026_PHOTOS[0].src);
    expect(within(dialog).getByText(/1\/24/)).toBeInTheDocument();

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
