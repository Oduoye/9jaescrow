import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DisputesTab from './DisputesTab';
import { vi } from 'vitest';

const sampleDisputes = [
  { id: 'd1', orderId: 'ord1', message: 'I did not receive payout', status: 'open', createdAt: new Date().toISOString(), imageUrls: [] }
];

test('renders disputes list and toggles expand', () => {
  const setExpanded = vi.fn();
  const setLightbox = vi.fn();
  render(
    <DisputesTab
      disputes={sampleDisputes as any}
      expandedDisputeIds={new Set()}
      setExpandedDisputeIds={setExpanded as any}
      hasMoreDisputes={false}
      setLightboxUrl={setLightbox as any}
      currentUserId={'u1'}
      currentUserEmail={'u@example.com'}
    />
  );
  expect(screen.getByText(/My Disputes/i)).toBeTruthy();
  const header = screen.getByText(/Order #/i);
  fireEvent.click(header);
  expect(setExpanded).toHaveBeenCalled();
});
