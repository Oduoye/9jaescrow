import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrdersTab from './OrdersTab';
import { vi } from 'vitest';

const sampleOrders = [
  {
    id: 'ord_abc123',
    type: 'buy',
    token: 'USDT',
    network: 'BSC',
    userEmail: 'foo@example.com',
    createdAt: new Date().toISOString(),
    cryptoAmount: 10,
    rate: 1540,
    ngnAmount: 15400,
    status: 'pending'
  }
];

test('renders orders and calls setSelectedOrder on review', () => {
  const setSelectedOrder = vi.fn();
  const setOrdersQueueLimit = vi.fn();
  const { getByText } = render(<OrdersTab orders={sampleOrders as any} ordersQueueLimit={5} setOrdersQueueLimit={setOrdersQueueLimit as any} setSelectedOrder={setSelectedOrder as any} />);

  expect(getByText(/Order Queue/i)).toBeTruthy();
  const btn = getByText(/Review Details/i);
  fireEvent.click(btn);
  expect(setSelectedOrder).toHaveBeenCalled();
});
