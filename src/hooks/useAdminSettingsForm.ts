import { useEffect, useState } from 'react';
import { AdminSettings } from '../types';
import { updateAdminSettings as updateAdminSettingsApi } from '../lib/dbHelpers';

type ToastFn = (msg: string, type: 'success' | 'error' | 'info') => void;

export default function useAdminSettingsForm(initial: AdminSettings, onRefresh: () => void, addToast: ToastFn) {
  const [bankName, setBankName] = useState(initial.ngnBankName);
  const [accountNumber, setAccountNumber] = useState(initial.ngnAccountNumber);
  const [accountName, setAccountName] = useState(initial.ngnAccountName);
  const [usdtSellMarkup, setUsdtSellMarkup] = useState<number>(initial.usdtSellMarkup);
  const [usdtBuyMarkup, setUsdtBuyMarkup] = useState<number>(initial.usdtBuyMarkup);
  const [bscWallet, setBscWallet] = useState(initial.wallets.BSC);
  const [tronWallet, setTronWallet] = useState(initial.wallets.Tron);
  const [polygonWallet, setPolygonWallet] = useState(initial.wallets.Polygon);
  const [isSaving, setIsSaving] = useState(false);

  // keep in sync if parent updates settings prop
  useEffect(() => {
    setBankName(initial.ngnBankName);
    setAccountNumber(initial.ngnAccountNumber);
    setAccountName(initial.ngnAccountName);
    setUsdtSellMarkup(initial.usdtSellMarkup);
    setUsdtBuyMarkup(initial.usdtBuyMarkup);
    setBscWallet(initial.wallets.BSC);
    setTronWallet(initial.wallets.Tron);
    setPolygonWallet(initial.wallets.Polygon);
  }, [initial]);

  const save = async () => {
    if (!bankName || !accountNumber || !accountName) {
      addToast('Please complete all bank credential fields.', 'error');
      return;
    }
    setIsSaving(true);
    try {
      const updated: AdminSettings = {
        ngnBankName: bankName,
        ngnAccountNumber: accountNumber,
        ngnAccountName: accountName,
        usdtSellMarkup: Number(usdtSellMarkup),
        usdtBuyMarkup: Number(usdtBuyMarkup),
        wallets: {
          BSC: bscWallet,
          Tron: tronWallet,
          Polygon: polygonWallet
        }
      };
      await updateAdminSettingsApi(updated);
      addToast('System configurations updated successfully.', 'success');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to save settings: ' + (err?.message ?? String(err)), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return {
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
  } as const;
}
