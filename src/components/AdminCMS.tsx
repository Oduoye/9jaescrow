import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp, Users, Layers, Settings, Bell, FileCheck, X, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, SquareCheck as CheckSquare, ExternalLin[...]
import { UserProfile, Order, AdminSettings, Announcement, KYCData, CoinListing, Dispute } from '../types';
import { formatNGT, formatNGTDate } from '../lib/dateUtils';
import DisputeChat from './DisputeChat';
import SettingsTab from './admin/SettingsTab';
import { 
  processOrder, 
  handleKYCReview, 
  updateAdminSettings, 
  createAnnouncement, 
  deleteAnnouncement,
  updateAnnouncement,
  hardDeleteAnnouncement,
  createCoinListing,
  deleteCoinListing,
  toggleCoinPublish,
  updateCoinFees,
  updateCoinDetails,
  updateUserAdminAction,
  suspendUser,
  terminateUser,
  reinstateUser,
  reactivatePendingUser,
  resolveDispute
} from '../lib/dbHelpers';

interface AdminCMSProps {
  userProfile: UserProfile;
  orders: Order[];
  kycUsers: UserProfile[];
  settings: AdminSettings;
  announcements: Announcement[];
  coins: CoinListing[];
  disputes: Dispute[];
  hasMoreDisputes?: boolean;
  onLoadMoreDisputes?: () => void;
  liveNgnRate?: number | null;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onRefresh: () => void;
}

export default function AdminCMS({
  userProfile,
  orders,
  kycUsers,
  settings,
  announcements,
  coins,
  disputes,
  hasMoreDisputes = false,
  onLoadMoreDisputes,
  liveNgnRate,
  addToast,
  onRefresh
}: AdminCMSProps) {
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'kyc' | 'settings' | 'bulletins' | 'coins' | 'accounts' | 'disputes' | 'compliance'>('analytics');
  const [complianceViewUser, setComplianceViewUser] = useState<UserProfile | null>(null);
  const [reactivationSearchEmail, setReactivationSearchEmail] = useState('');
  const [isReactivating, setIsReactivating] = useState(false);

  // Pagination for order queue
  const [ordersQueueLimit, setOrdersQueueLimit] = useState(5);
  
  // Expanded Order for action
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [blockchainTxId, setBlockchainTxId] = useState('');
  const [orderRejectionReason, setOrderRejectionReason] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Expanded KYC user for action
  const [selectedKycUser, setSelectedKycUser] = useState<UserProfile | null>(null);
  const [kycRejectionReason, setKycRejectionReason] = useState('');
  const [isProcessingKyc, setIsProcessingKyc] = useState(false);

  // Copy to clipboard helper — shows toast on success or failure
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast(`${label} copied!`, 'success');
    } catch {
      addToast('Copy failed — please select and copy manually.', 'error');
    }
  };

  // Settings form states (moved into hook — placeholder kept for backward compatibility until extraction complete)
  // Coin Listing form states
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinNetwork, setCoinNetwork] = useState('');
  const [coinWalletAddress, setCoinWalletAddress] = useState('');
  const [coinRate, setCoinRate] = useState<number>(settings.usdtSellMarkup);
  const [coinLogoUrl, setCoinLogoUrl] = useState('');
  const [coinFeePercentage, setCoinFeePercentage] = useState<number>(0);
  const [coinMinTradeAmount, setCoinMinTradeAmount] = useState<number>(1);
  const [coinMinBuyAmount, setCoinMinBuyAmount] = useState<number>(1);
  const [coinMinSellAmount, setCoinMinSellAmount] = useState<number>(1);
  const [coinPricePegged, setCoinPricePegged] = useState<boolean>(false);
  const [coinGeckoId, setCoinGeckoId] = useState('');
  const [isCreatingCoin, setIsCreatingCoin] = useState(false);
  const coinLogoInputRef = React.useRef<HTMLInputElement>(null);

  // Inline fee editor state for existing coins
  const [editingCoinId, setEditingCoinId] = useState<string | null>(null);
  const [editFeePercent, setEditFeePercent] = useState<number>(0);
  const [editMinAmount, setEditMinAmount] = useState<number>(1);
  const [editMinBuyAmount, setEditMinBuyAmount] = useState<number>(1);
  const [editMinSellAmount, setEditMinSellAmount] = useState<number>(1);
  const [editPricePegged, setEditPricePegged] = useState<boolean>(false);
  const [editCoinGeckoId, setEditCoinGeckoId] = useState('');
  const [isSavingCoinFees, setIsSavingCoinFees] = useState(false);
  // Full coin details editor modal state
  const [showEditCoinModal, setShowEditCoinModal] = useState(false);
  const [editCoin, setEditCoin] = useState<CoinListing | null>(null);
  const [editName, setEditName] = useState('');
  const [editSymbol, setEditSymbol] = useState('');
  const [editNetwork, setEditNetwork] = useState('');
  const [editWalletAddress, setEditWalletAddress] = useState('');
  const [editRate, setEditRate] = useState<number>(0);
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [isSavingCoinDetails, setIsSavingCoinDetails] = useState(false);

  // Announcement form states
  const [bulletinTitle, setBulletinTitle] = useState('');
  const [bulletinContent, setBulletinContent] = useState('');
  const [bulletinScope, setBulletinScope] = useState<Announcement['scope']>('all');
  const [isCreatingBulletin, setIsCreatingBulletin] = useState(false);
  const [showArchivedBulletins, setShowArchivedBulletins] = useState(false);
  const [editingAnn, setEditingAnn] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editScope, setEditScope] = useState<'public' | 'private' | 'all'>('all');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Trader directory state
  const [selectedTrader, setSelectedTrader] = useState<UserProfile | null>(null);
  const [traderActionReason, setTraderActionReason] = useState('');
  const [isActioningTrader, setIsActioningTrader] = useState(false);

  // Dispute state
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [disputeResponseText, setDisputeResponseText] = useState('');
  const [isResolvingDispute, setIsResolvingDispute] = useState(false);

  // Image lightbox
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Lookup tab state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupSearched, setLookupSearched] = useState('');

  // Calculate quick metrics for Analytics view
  const totalBuyVolumeUsdt = orders
    .filter((o) => o.type === 'buy' && o.status === 'completed')
    .reduce((sum, o) => sum + (o.usdtEquivalent ?? o.cryptoAmount), 0);

  const totalSellVolumeNgn = orders
    .filter((o) => o.type === 'sell' && o.status === 'completed')
    .reduce((sum, o) => sum + o.ngnAmount, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const pendingKycCount = kycUsers.filter((u) => u.kycStatus === 'pending').length;
  const openDisputeCount = disputes.filter((d) => d.status === 'open').length;

  const totalUsersCount = kycUsers.filter(u => u.role !== 'admin').length;

  // Process order approval
  const handleOrderApproval = async (id: string) => {
    // For sell orders, the trader already provided a blockchain tx hash when initiating the order.
    // The admin only needs to enter a bank reference (optional if trader tx exists).
    const isSellWithTraderTx = selectedOrder?.type === 'sell' && !!selectedOrder?.blockchainTxId;
    if (!isSellWithTraderTx && !blockchainTxId.trim()) {
      addToast('Please input the official Blockchain Tx ID or NGN reference code.', 'error');
      return;
    }
    setIsProcessingOrder(true);
    try {
      // For sell orders with an existing trader tx hash, only update with admin ref if provided
      await processOrder(id, 'completed', blockchainTxId.trim() || undefined);
      addToast('Order completed and digital receipt generated.', 'success');
      setSelectedOrder(null);
      setBlockchainTxId('');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to approve order: ' + err.message, 'error');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  // Process order rejection
  const handleOrderRejection = async (id: string) => {
    if (!orderRejectionReason.trim()) {
      addToast('Please provide a specific reason for rejection.', 'error');
      return;
    }
    setIsProcessingOrder(true);
    try {
      await processOrder(id, 'rejected', undefined, orderRejectionReason.trim());
      addToast('Order has been declined and feedback sent to user dashboard.', 'info');
      setSelectedOrder(null);
      setOrderRejectionReason('');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to reject order: ' + err.message, 'error');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  // Process KYC approval
  const handleKycApproval = async (uid: string) => {
    setIsProcessingKyc(true);
    try {
      await handleKYCReview(uid, true);
      addToast('KYC approved! Operation unlocked for user.', 'success');
      setSelectedKycUser(null);
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to approve KYC: ' + err.message, 'error');
    } finally {
      setIsProcessingKyc(false);
    }
  };

  // Process KYC rejection
  const handleKycRejection = async (uid: string) => {
    if (!kycRejectionReason.trim()) {
      addToast('Please specify the declination reasons for retry feedback.', 'error');
      return;
    }
    setIsProcessingKyc(true);
    try {
      await handleKYCReview(uid, false, kycRejectionReason.trim());
      addToast('KYC rejected. Guidelines sent to user dashboard.', 'info');
      setSelectedKycUser(null);
      setKycRejectionReason('');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to reject KYC: ' + err.message, 'error');
    } finally {
      setIsProcessingKyc(false);
    }
  };

  // Suspend a trader
  const handleSuspendUser = async (uid: string, email: string) => {
    if (!traderActionReason.trim()) { addToast('Please enter a reason for suspension.', 'error'); return; }
    setIsActioningTrader(true);
    try {
      await suspendUser(uid, traderActionReason.trim());
      addToast(`${email} has been suspended.`, 'info');
      setSelectedTrader(null);
      setTraderActionReason('');
      onRefresh();
    } catch (err: any) {
      addToast('Failed to suspend: ' + err.message, 'error');
    } finally {
      setIsActioningTrader(false);
    }
  };

  // Terminate a trader
  const handleTerminateUser = async (uid: string, email: string) => {
    if (!traderActionReason.trim()) { addToast('Please enter a reason for termination.', 'error'); return; }
    if (!confirm(`Permanently terminate ${email}? They will be locked out.`)) return;
    setIsActioningTrader(true);
    try {
      await terminateUser(uid, traderActionReason.trim());
      addToast(`${email} has been terminated.`, 'info');
      setSelectedTrader(null);
      setTraderActionReason('');
      onRefresh();
    } catch (err: any) {
      addToast('Failed to terminate: ' + err.message, 'error');
    } finally {
      setIsActioningTrader(false);
    }
  };

  // Reinstate a trader
  const handleReinstateUser = async (uid: string, email: string) => {
    setIsActioningTrader(true);
    try {
      await reinstateUser(uid);
      addToast(`${email} has been reinstated to active status.`, 'success');
      if (selectedTrader?.uid === uid) setSelectedTrader({ ...selectedTrader, accountStatus: 'active', suspendReason: undefined, terminateReason: undefined });
      onRefresh();
    } catch (err: any) {
      addToast('Failed to reinstate: ' + err.message, 'error');
    } finally {
      setIsActioningTrader(false);
    }
  };

  // Reactivate a pending_reactivation account (deleted user who re-registered)
  const handleReactivatePendingUser = async (uid: string, email: string) => {
    setIsReactivating(true);
    try {
      await reactivatePendingUser(uid);
      addToast(`${email} has been reactivated. They can now sign in and access the platform.`, 'success');
      setReactivationSearchEmail('');
      onRefresh();
    } catch (err: any) {
      addToast('Failed to reactivate: ' + err.message, 'error');
    } finally {
      setIsReactivating(false);
    }
  };

  // Resolve a dispute
  const handleResolveDispute = async (id: string) => {
    if (!disputeResponseText.trim()) { addToast('Please enter your response before resolving.', 'error'); return; }
    setIsResolvingDispute(true);
    try {
      await resolveDispute(id, disputeResponseText.trim());
      addToast('Dispute resolved and response sent.', 'success');
      setSelectedDispute(null);
      setDisputeResponseText('');
      onRefresh();
    } catch (err: any) {
      addToast('Failed to resolve dispute: ' + err.message, 'error');
    } finally {
      setIsResolvingDispute(false);
    }
  };

  // Create Bulletin
  const handleCreateBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinTitle.trim() || !bulletinContent.trim()) {
      addToast('Please provide a bulletin title and details.', 'error');
      return;
    }

    setIsCreatingBulletin(true);
    try {
      await createAnnouncement({
        title: bulletinTitle.trim(),
        content: bulletinContent.trim(),
        scope: bulletinScope,
        isActive: true
      });
      addToast('New announcement published successfully!', 'success');
      setBulletinTitle('');
      setBulletinContent('');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to create announcement: ' + err.message, 'error');
    } finally {
      setIsCreatingBulletin(false);
    }
  };

  // Archive announcement
  const handleDeactivateBulletin = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      addToast('Announcement archived.', 'info');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Error: ' + err.message, 'error');
    }
  };

  // Hard delete announcement
  const handleHardDeleteBulletin = async (id: string, title: string) => {
    if (!confirm(`Permanently delete "${title}"? This cannot be undone.`)) return;
    try {
      await hardDeleteAnnouncement(id);
      addToast('Announcement permanently deleted.', 'info');
      onRefresh();
    } catch (err: any) {
      addToast('Error: ' + err.message, 'error');
    }
  };

  // Save edited announcement
  const handleSaveEdit = async () => {
    if (!editingAnn || !editTitle.trim() || !editContent.trim()) return;
    setIsSavingEdit(true);
    try {
      await updateAnnouncement(editingAnn, { title: editTitle.trim(), content: editContent.trim(), scope: editScope });
      addToast('Announcement updated.', 'success');
      setEditingAnn(null);
      onRefresh();
    } catch (err: any) {
      addToast('Update failed: ' + err.message, 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Create Coin Listing
  const handleCreateCoinListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coinName.trim() || !coinSymbol.trim() || !coinNetwork.trim() || !coinWalletAddress.trim() || coinRate <= 0) {
      addToast('Please fill out all coin listing details.', 'error');
      return;
    }
    
    setIsCreatingCoin(true);
    try {
      await createCoinListing({
        name: coinName.trim(),
        symbol: coinSymbol.trim().toUpperCase(),
        network: coinNetwork.trim(),
        walletAddress: coinWalletAddress.trim(),
        rate: Number(coinRate),
        logoUrl: coinLogoUrl || 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=040',
        feePercentage: coinFeePercentage,
        minTradeAmount: coinMinTradeAmount,
        minBuyAmount: coinMinBuyAmount,
        minSellAmount: coinMinSellAmount,
        pricePegged: coinPricePegged,
        coinGeckoId: coinGeckoId.trim() || null,
      });
      addToast(`Coin listing "${coinName}" added successfully!`, 'success');
      // Reset form
      setCoinName('');
      setCoinSymbol('');
      setCoinNetwork('');
      setCoinWalletAddress('');
      setCoinRate(settings.usdtSellMarkup);
      setCoinLogoUrl('');
      setCoinFeePercentage(0);
      setCoinMinTradeAmount(1);
      setCoinMinBuyAmount(1);
      setCoinMinSellAmount(1);
      setCoinPricePegged(false);
      setCoinGeckoId('');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to list coin: ' + err.message, 'error');
    } finally {
      setIsCreatingCoin(false);
    }
  };

  // Save fee settings on existing coin (inline quick editor)
  const handleSaveCoinFees = async (coinId: string) => {
    setIsSavingCoinFees(true);
    try {
      await updateCoinDetails(coinId, {
        feePercentage: editFeePercent,
        minTradeAmount: editMinAmount,
        minBuyAmount: editMinBuyAmount,
        minSellAmount: editMinSellAmount,
        pricePegged: editPricePegged,
        coinGeckoId: editCoinGeckoId.trim() || null,
      });
      addToast('Coin settings saved!', 'success');
      setEditingCoinId(null);
      onRefresh();
    } catch (err: any) {
      addToast('Failed to save fees: ' + err.message, 'error');
    } finally {
      setIsSavingCoinFees(false);
    }
  };

  // Open full coin details editor modal
  const openEditCoinModal = (coin: CoinListing) => {
    setEditCoin(coin);
    setEditName(coin.name);
    setEditSymbol(coin.symbol);
    setEditNetwork(coin.network);
    setEditWalletAddress(coin.walletAddress);
    setEditRate(coin.rate);
    setEditLogoUrl(coin.logoUrl || '');
    setEditFeePercent(coin.feePercentage ?? 0);
    setEditMinAmount(coin.minTradeAmount ?? 1);
    setEditMinBuyAmount(coin.minBuyAmount ?? coin.minTradeAmount ?? 1);
    setEditMinSellAmount(coin.minSellAmount ?? coin.minTradeAmount ?? 1);
    setEditPricePegged(coin.pricePegged ?? false);
    setEditCoinGeckoId(coin.coinGeckoId ?? '');
    setShowEditCoinModal(true);
  };

  // Save full coin details from modal
  const handleSaveCoinDetails = async () => {
    if (!editCoin?.id) return;
    if (!editName.trim() || !editSymbol.trim() || !editNetwork.trim() || !editWalletAddress.trim()) {
      addToast('Name, symbol, network, and wallet address are required.', 'error');
      return;
    }
    setIsSavingCoinDetails(true);
    try {
      await updateCoinDetails(editCoin.id, {
        name: editName.trim(),
        symbol: editSymbol.trim().toUpperCase(),
        network: editNetwork.trim(),
        walletAddress: editWalletAddress.trim(),
        rate: Number(editRate),
        logoUrl: editLogoUrl || undefined,
        feePercentage: editFeePercent,
        minTradeAmount: editMinAmount,
        minBuyAmount: editMinBuyAmount,
        minSellAmount: editMinSellAmount,
        pricePegged: editPricePegged,
        coinGeckoId: editCoinGeckoId.trim() || null,
      });
      addToast(`Coin "${editName}" updated successfully!`, 'success');
      setShowEditCoinModal(false);
      setEditCoin(null);
      onRefresh();
    } catch (err: any) {
      addToast('Failed to update coin: ' + err.message, 'error');
    } finally {
      setIsSavingCoinDetails(false);
    }
  };

  // Delete Coin Listing
  const handleDeleteCoin = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to hide ${name} from coin listings? This keeps it in the database for historical transactions but hides it from users.`)) {
      return;
    }
    try {
      await deleteCoinListing(id);
      addToast(`"${name}" has been hidden successfully.`, 'info');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to hide coin listing: ' + err.message, 'error');
    }
  };

  // Toggle Coin Publish/Active status
  const handleToggleCoinPublish = async (id: string, currentPublished: boolean, name: string) => {
    const nextPublished = !currentPublished;
    try {
      await toggleCoinPublish(id, nextPublished);
      addToast(`"${name}" is now ${nextPublished ? 'published & active' : 'hidden & unpublished'}.`, 'success');
      onRefresh();
    } catch (err: any) {
      console.error(err);
      addToast('Failed to change coin listing status: ' + err.message, 'error');
    }
  };

  // Helper to process 512x512 logo upload
  const handleCoinLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        addToast('Please upload an image file (PNG, JPG, or WEBP)', 'error');
        return;
      }
      if (file.size > 1 * 1024 * 1024) {
        addToast('Logo image size should be less than 1MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        
        // Let's create an Image element to check dimensions
        const img = new Image();
        img.src = base64;
        img.onload = () => {
          if (img.width !== 512 || img.height !== 512) {
            addToast(`Ideal logo size is 512x512px (Uploaded logo is ${img.width}x${img.height}px). Custom logo auto-scaled!`, 'info');
          } else {
            addToast('Pristine 512x512px logo verified and saved!', 'success');
          }
          setCoinLogoUrl(base64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans text-[#1A1A1A]">
      
      {/* Admin header with metrics */}
      <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 border border-[#E0E7E0]/10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="space-y-1">
          <span className="text-[10px] bg-[#E6F4EA]/10 border border-[#E6F4EA]/20 text-[#00FF85] font-mono px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
            9IJA ESCROW ADMIN CONSOLE
          </span>
          <h2 className="text-2xl font-bold tracking-tight mt-1.5">
            Operation Terminal
          </h2>
          <p className="text-xs text-gray-400">
            Admin portal role for {userProfile.email}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 lg:flex lg:gap-4 border-t border-[#E0E7E0]/10 lg:border-t-0 pt-4 lg:pt-0 w-full lg:w-auto">
          <div className="bg-white/10 px-2.5 lg:px-4 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl border border-white/10 text-center">
            <span className="text-[8px] lg:text-[9px] text-gray-400 font-mono block leading-tight">PENDING<br className="lg:hidden" />{' '}ORDERS</span>
            <span className="text-base lg:text-lg font-bold text-amber-400">{pendingOrdersCount}</span>
          </div>
          <div className="bg-white/10 px-2.5 lg:px-4 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl border border-white/10 text-center">
            <span className="text-[8px] lg:text-[9px] text-gray-400 font-mono block leading-tight">KYC<br className="lg:hidden" />{' '}REQUESTS</span>
            <span className="text-base lg:text-lg font-bold text-amber-400">{pendingKycCount}</span>
          </div>
          <div className="bg-white/10 px-2.5 lg:px-4 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl border border-white/10 text-center">
            <span className="text-[8px] lg:text-[9px] text-gray-400 font-mono block leading-tight">SELL<br className="lg:hidden" />{' '}RATE</span>
            <span className="text-base lg:text-lg font-bold text-[#00FF85]">
              ₦{liveNgnRate
                ? (Math.round(liveNgnRate) + settings.usdtSellMarkup).toLocaleString()
                : `+${settings.usdtSellMarkup}`}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Nav Tabs and Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* Tab navigation — horizontal scroll strip on 모바일, vertical sidebar on desktop */}
        <div className="lg:col-span-3">

... (file truncated for brevity; unchanged parts preserved) ...

          {/* TAB 4: CONFIGURATIONS (PAYMENT & RATES) */}
          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              liveNgnRate={liveNgnRate}
              addToast={addToast}
              onRefresh={onRefresh}
            />
          )}

... (file continues unchanged) ...

    </div>
  );
}
