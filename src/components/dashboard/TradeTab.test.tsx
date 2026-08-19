import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TradeTab from './TradeTab';
import { vi } from 'vitest';

const sampleOrders = [
  { id: 'ord1', type: 'buy', cryptoAmount: 10, token: 'USDT', createdAt: new Date().toISOString(), userEmail: 'u@example.com' }
];

test('renders trade tab and opens details', () => {
  const setSelectedOrder = vi.fn();
  render(<TradeTab orders={sampleOrders as any} pendingOrdersCount={1} setSelectedOrder={setSelectedOrder} />);

  expect(screen.getByText(/Trade/i)).toBeTruthy();
  const btn = screen.getByText(/Details/i);
  fireEvent.click(btn);
  expect(setSelectedOrder).toHaveBeenCalled();
});
