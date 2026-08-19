import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SettingsTab from './SettingsTab';
import * as db from '../../lib/dbHelpers';
import { vi } from 'vitest';
import { AdminSettings } from '../../types';

vi.spyOn(db, 'updateAdminSettings').mockResolvedValue({});

const baseSettings: AdminSettings = {
  ngnBankName: 'Zenith',
  ngnAccountNumber: '1012345678',
  ngnAccountName: '9ija Escrow Ltd.',
  usdtSellMarkup: 100,
  usdtBuyMarkup: 80,
  wallets: { BSC: '0x0', Tron: 'T0', Polygon: '0x1' }
};

test('saves settings and calls onRefresh', async () => {
  const onRefresh = vi.fn();
  const addToast = vi.fn();
  const { getByPlaceholderText, getByText } = render(<SettingsTab settings={baseSettings} liveNgnRate={null} addToast={addToast} onRefresh={onRefresh} />);

  const bankInput = getByPlaceholderText(/e.g. Zenith Bank/i) as HTMLInputElement;
  fireEvent.change(bankInput, { target: { value: 'Updated Bank' } });

  const saveBtn = getByText(/Save Configurations/i);
  fireEvent.click(saveBtn);

  await waitFor(() => expect(db.updateAdminSettings).toHaveBeenCalled());
  expect(onRefresh).toHaveBeenCalled();
});
