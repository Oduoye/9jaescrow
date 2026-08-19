import React from 'react';
import { render, screen } from '@testing-library/react';
import AnalyticsTab from './AnalyticsTab';

test('renders analytics metrics', () => {
  render(
    <AnalyticsTab
      totalBuyVolumeUsdt={12345}
      totalSellVolumeNgn={9876543}
      pendingOrdersCount={5}
      pendingKycCount={2}
      openDisputeCount={1}
      totalUsersCount={150}
      liveNgnRate={820}
      usdtSellMarkup={100}
    />
  );

  expect(screen.getByText(/Analytics Overview/i)).toBeTruthy();
  expect(screen.getByText(/Completed Buys/i)).toBeTruthy();
  expect(screen.getByText(/Completed Sells/i)).toBeTruthy();
});
