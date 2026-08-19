import React from 'react';
import { AdminSettings } from '../../types';
import useAdminSettingsForm from '../../hooks/useAdminSettingsForm';
import { Clock, Plus } from 'lucide-react';

type Props = {
  settings: AdminSettings;
  liveNgnRate?: number | null;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onRefresh: () => void;
};

export default function SettingsTab({ settings, liveNgnRate, addToast, onRefresh }: Props) {
  const {
    bankName,
    setBankName,
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
    usdtSellMarkup,
    setUsdtSellMarkup,
    usdtBuyMarkup,
    setUsdtBuyMarkup,
    bscWallet,
    setBscWallet,
    tronWallet,
    setTronWallet,
    polygonWallet,
    setPolygonWallet,
    isSaving,
    save
  } = useAdminSettingsForm(settings, onRefresh, addToast);

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-6 text-slate-800">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Merchant Configuration Panel</h3>
        <p className="text-xs text-slate-500">Update NGN cash receiving bank credentials, cryptocurrency rates, and active wallet address logs.</p>
      </div>

      {/* Rate setting — split SELL / BUY markups */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">NGN/USDT Rate Configuration</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Set the NGN markup added on top of the live CoinGecko market price for each trade direction.
            The SELL rate drives the hero & dashboard display.
          </p>
        </div>

        {/* Live preview card */}
        {liveNgnRate ? (
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono uppercase text-[9px] tracking-wider">Live Market (CoinGecko)</span>
              <span className="font-semibold text-slate-600">₦{Math.round(liveNgnRate).toLocaleString()} / USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono uppercase text-[9px] tracking-wider">Effective SELL Rate</span>
              <span className="font-bold text-emerald-700">₦{(Math.round(liveNgnRate) + usdtSellMarkup).toLocaleString()} / USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono uppercase text-[9px] tracking-wider">Effective BUY Rate</span>
              <span className="font-bold text-blue-700">₦{(Math.round(liveNgnRate) + usdtBuyMarkup).toLocaleString()} / USDT</span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-700 font-mono">
            ⏳ Fetching live market rate… preview will appear once available.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* SELL Markup */}
          <div>
            <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">
              SELL Markup (NGN added to market)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-bold">+₦</div>
              <input
                type="number"
                value={usdtSellMarkup}
                onChange={(e) => setUsdtSellMarkup(Number(e.target.value))}
                className="block w-full pl-10 pr-14 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#008751]"
                placeholder="e.g. 100"
                min={0}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">/ USDT</div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Hero display, dashboard card & sell orders.</p>
          </div>

          {/* BUY Markup */}
          <div>
            <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">
              BUY Markup (NGN added to market)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-bold">+₦</div>
              <input
                type="number"
                value={usdtBuyMarkup}
                onChange={(e) => setUsdtBuyMarkup(Number(e.target.value))}
                className="block w-full pl-10 pr-14 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#008751]"
                placeholder="e.g. 80"
                min={0}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">/ USDT</div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Applied only at buy order creation time.</p>
          </div>
        </div>
      </div>

      {/* Bank accounts */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">Owner receiving NGN bank credentials</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Bank Name</label>
            <input
              type="text"
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. Zenith Bank"
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Account Number</label>
            <input
              type="text"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 1012345678"
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Account Name</label>
            <input
              type="text"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="e.g. 9ija Escrow Ltd."
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium"
            />
          </div>
        </div>
      </div>

      {/* Wallet logs */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">Crypto Wallet Addresses (USDT)</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1 font-mono">BSC Wallet Address (BEP20)</label>
            <input
              type="text"
              required
              value={bscWallet}
              onChange={(e) => setBscWallet(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1 font-mono">Tron Wallet Address (TRC20)</label>
            <input
              type="text"
              required
              value={tronWallet}
              onChange={(e) => setTronWallet(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1 font-mono">Polygon Wallet Address</label>
            <input
              type="text"
              required
              value={polygonWallet}
              onChange={(e) => setPolygonWallet(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-emerald-600 hover:bg-emerald-500 text-emerald-950 font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-200"
        >
          {isSaving ? (
            <>
              <Clock className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            'Save Configurations'
          )}
        </button>
      </div>
    </form>
  );
}
