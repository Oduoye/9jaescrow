import React from 'react';

type Props = {
  totalBuyVolumeUsdt: number;
  totalSellVolumeNgn: number;
  pendingOrdersCount: number;
  pendingKycCount: number;
  openDisputeCount: number;
  totalUsersCount: number;
  liveNgnRate?: number | null;
  usdtSellMarkup: number;
};

export default function AnalyticsTab({
  totalBuyVolumeUsdt,
  totalSellVolumeNgn,
  pendingOrdersCount,
  pendingKycCount,
  openDisputeCount,
  totalUsersCount,
  liveNgnRate,
  usdtSellMarkup
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Analytics Overview</h3>
        <p className="text-xs text-slate-500">Quick metrics and key performance indicators for platform health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">Completed Buys (USDT)</div>
          <div className="text-2xl font-bold text-emerald-700">{totalBuyVolumeUsdt.toLocaleString()}</div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">Completed Sells (NGN)</div>
          <div className="text-2xl font-bold text-amber-700">₦{totalSellVolumeNgn.toLocaleString()}</div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">Active Users</div>
          <div className="text-2xl font-bold text-slate-900">{totalUsersCount}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">Pending Orders</div>
          <div className="text-xl font-bold text-amber-600">{pendingOrdersCount}</div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">KYC Requests</div>
          <div className="text-xl font-bold text-amber-600">{pendingKycCount}</div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500">Open Disputes</div>
          <div className="text-xl font-bold text-rose-600">{openDisputeCount}</div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <div className="text-xs text-slate-500">Sell Rate (live + markup)</div>
        <div className="text-lg font-bold text-[#00FF85]">₦{liveNgnRate ? (Math.round(liveNgnRate) + usdtSellMarkup).toLocaleString() : `+${usdtSellMarkup}`}</div>
        <p className="text-xs text-slate-400 mt-2">These figures are snapshots and may be refreshed from the settings page.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4 text-sm text-slate-600">
        <div>Note: For deeper analytics, integrate a dedicated analytics service or export data for BI tools.</div>
      </div>
    </div>
  );
}
