import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ComplianceTab from './ComplianceTab';
import { vi } from 'vitest';

const sampleUser = { uid: 'u1', email: 'user@example.com', firstName: 'Jane', lastName: 'Doe', createdAt: new Date().toISOString(), kycStatus: 'pending' };

test('renders compliance tab and triggers reactivate', () => {
  const setComplianceViewUser = vi.fn();
  const setReactivationSearchEmail = vi.fn();
  const handleReactivatePendingUser = vi.fn();

  render(
    <ComplianceTab
      complianceViewUser={sampleUser as any}
      setComplianceViewUser={setComplianceViewUser}
      reactivationSearchEmail={''}
      setReactivationSearchEmail={setReactivationSearchEmail}
      isReactivating={false}
      handleReactivatePendingUser={handleReactivatePendingUser}
    />
  );

  expect(screen.getByText(/Compliance & Reactivations/i)).toBeTruthy();
  const reactivateBtn = screen.getByText(/Reactivate Selected/i);
  fireEvent.click(reactivateBtn);
  expect(handleReactivatePendingUser).toHaveBeenCalled();
});
