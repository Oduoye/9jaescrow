import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KycTab from './KycTab';
import { vi } from 'vitest';

const sampleUsers = [
  { uid: 'u1', email: 'a@example.com', firstName: 'A', lastName: 'B', kycStatus: 'pending', createdAt: new Date().toISOString(), kycSubmittedAt: new Date().toISOString() }
];

test('renders kyc list and calls setSelectedKycUser', () => {
  const setSelectedKycUser = vi.fn();
  render(<KycTab kycUsers={sampleUsers as any} setSelectedKycUser={setSelectedKycUser} />);
  expect(screen.getByText(/KYC Review Queue/i)).toBeTruthy();
  const btn = screen.getByText(/Review Documents/i);
  fireEvent.click(btn);
  expect(setSelectedKycUser).toHaveBeenCalled();
});
