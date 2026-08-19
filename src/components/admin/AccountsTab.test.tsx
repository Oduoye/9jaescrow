import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AccountsTab from './AccountsTab';
import { vi } from 'vitest';

const sampleTraders = [
  { uid: 't1', email: 'trader@example.com', firstName: 'John', lastName: 'Doe', phone: '08012345678', createdAt: new Date().toISOString(), accountStatus: 'active' }
];

test('renders traders list and calls setSelectedTrader on view', () => {
  const setSelectedTrader = vi.fn();
  const setTraderActionReason = vi.fn();
  const handleSuspendUser = vi.fn();
  const handleTerminateUser = vi.fn();
  const handleReinstateUser = vi.fn();

  render(<AccountsTab
    traders={sampleTraders as any}
    selectedTrader={null}
    setSelectedTrader={setSelectedTrader}
    traderActionReason={''}
    setTraderActionReason={setTraderActionReason}
    isActioningTrader={false}
    handleSuspendUser={handleSuspendUser}
    handleTerminateUser={handleTerminateUser}
    handleReinstateUser={handleReinstateUser}
  />);

  expect(screen.getByText(/Trader Directory & Actions/i)).toBeTruthy();
  const viewBtn = screen.getByText(/View/i);
  fireEvent.click(viewBtn);
  expect(setSelectedTrader).toHaveBeenCalled();
});
