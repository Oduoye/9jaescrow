import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import KycTab from './KycTab';
import { vi } from 'vitest';

const sampleUsers = [
  {
    uid: 'user_1',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Banks',
    kycStatus: 'pending',
    createdAt: new Date().toISOString(),
    kycSubmittedAt: new Date().toISOString()
  }
];

test('renders kyc list and calls setSelectedKycUser on review', () => {
  const setSelectedKycUser = vi.fn();
  const { getByText } = render(<KycTab kycUsers={sampleUsers as any} setSelectedKycUser={setSelectedKycUser as any} />);

  expect(getByText(/KYC Review Queue/i)).toBeTruthy();
  const btn = getByText(/Review Documents/i);
  fireEvent.click(btn);
  expect(setSelectedKycUser).toHaveBeenCalled();
});
