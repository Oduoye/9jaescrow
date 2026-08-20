import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DisputesTab from './DisputesTab';
import { vi } from 'vitest';

const sampleDisputes = [
  { id: 'd1', title: 'Payment not received', status: 'open', createdAt: new Date().toISOString(), orderId: 'ord123', userEmail: 'u@example.com' }
];

test('renders disputes and opens dispute details', () => {
  const setSelectedDispute = vi.fn();
  const setDisputeResponseText = vi.fn();
  const handleResolveDispute = vi.fn();

  render(<DisputesTab
    disputes={sampleDisputes as any}
    selectedDispute={null}
    setSelectedDispute={setSelectedDispute}
    disputeResponseText={''}
    setDisputeResponseText={setDisputeResponseText}
    isResolvingDispute={false}
    handleResolveDispute={handleResolveDispute}
  />);

  expect(screen.getByText(/Disputes/i)).toBeTruthy();
  const openBtn = screen.getByText(/Open/i);
  fireEvent.click(openBtn);
  expect(setSelectedDispute).toHaveBeenCalled();
});
