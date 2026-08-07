import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookingModal } from './BookingModal';
import { sendLead } from '../lib/sendLead';

vi.mock('../lib/sendLead', () => ({ sendLead: vi.fn() }));

const sendLeadMock = vi.mocked(sendLead);

function renderModal(onClose = vi.fn()) {
  render(
    <MemoryRouter>
      <div id="app-shell"><button>Фоновая кнопка</button></div>
      <BookingModal open interest="Первый раз" onClose={onClose} />
    </MemoryRouter>,
  );
  return onClose;
}

beforeEach(() => {
  sendLeadMock.mockReset();
  sendLeadMock.mockResolvedValue(undefined);
});

describe('BookingModal', () => {
  it('exposes dialog semantics and closes on Escape', async () => {
    const onClose = renderModal();
    expect(screen.getByRole('dialog', { name: 'Записаться' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('requires explicit consent and submits labelled contact fields', async () => {
    renderModal();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Имя'), 'Иван Петров');
    await user.type(screen.getByLabelText('Телефон'), '+7 926 000-00-00');
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }));

    expect(await screen.findByText('Подтвердите согласие на обработку данных')).toBeInTheDocument();
    expect(sendLeadMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole('checkbox', { name: /политику конфиденциальности/i }));
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }));

    await waitFor(() => expect(sendLeadMock).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Иван Петров',
      phone: '+7 926 000-00-00',
      interest: 'Первый раз',
    })));
    expect(await screen.findByText('Заявка отправлена')).toBeInTheDocument();
  });
});
