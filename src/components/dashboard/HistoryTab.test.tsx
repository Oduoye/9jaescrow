import React from 'react';
import { render, screen } from '@testing-library/react';
import HistoryTab from './HistoryTab';

const sampleOrders = [
  { id: 'ord1', type: 'buy', cryptoAmount: 10, token: 'USDT', createdAt: new Date().toISOString(), status: 'completed', ngnAmount: 15000 }
];

test('renders history list', () => {
  render(<HistoryTab orders={sampleOrders as any} />);
  expect(screen.getByText(/History/i)).toBeTruthy();
  expect(screen.getByText(/completed/i)).toBeTruthy();
});
