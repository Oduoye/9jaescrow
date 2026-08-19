import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CoinsTab from './CoinsTab';
import { vi } from 'vitest';

const sampleCoins = [
  { id: 'coin1', name: 'Tether', symbol: 'USDT', network: 'BSC', logoUrl: '', rate: 1540, feePercentage: 1, minTradeAmount: 1, minBuyAmount: 1, minSellAmount: 1, published: true, createdAt: new Date().toISOString() }
];

test('renders coins form and calls create handler', () => {
  const handleCreateCoinListing = vi.fn((e) => e.preventDefault());
  const handleSaveCoinFees = vi.fn();
  const handleSaveCoinDetails = vi.fn();
  const handleDeleteCoin = vi.fn();
  const handleToggleCoinPublish = vi.fn();
  const openEditCoinModal = vi.fn();
  const handleCoinLogoChange = vi.fn();

  render(
    <CoinsTab
      coins={sampleCoins as any}
      coinName={''}
      setCoinName={()=>{}}
      coinSymbol={''}
      setCoinSymbol={()=>{}}
      coinNetwork={''}
      setCoinNetwork={()=>{}}
      coinWalletAddress={''}
      setCoinWalletAddress={()=>{}}
      coinRate={1540}
      setCoinRate={()=>{}}
      coinLogoUrl={''}
      setCoinLogoUrl={()=>{}}
      coinFeePercentage={1}
      setCoinFeePercentage={()=>{}}
      coinMinTradeAmount={1}
      setCoinMinTradeAmount={()=>{}}
      coinMinBuyAmount={1}
      setCoinMinBuyAmount={()=>{}}
      coinMinSellAmount={1}
      setCoinMinSellAmount={()=>{}}
      coinPricePegged={false}
      setCoinPricePegged={()=>{}}
      coinGeckoId={''}
      setCoinGeckoId={()=>{}}
      isCreatingCoin={false}
      editingCoinId={null}
      setEditingCoinId={()=>{}}
      editFeePercent={0}
      setEditFeePercent={()=>{}}
      editMinAmount={1}
      setEditMinAmount={()=>{}}
      editMinBuyAmount={1}
      setEditMinBuyAmount={()=>{}}
      editMinSellAmount={1}
      setEditMinSellAmount={()=>{}}
      editPricePegged={false}
      setEditPricePegged={()=>{}}
      editCoinGeckoId={''}
      setEditCoinGeckoId={()=>{}}
      isSavingCoinFees={false}
      showEditCoinModal={false}
      openEditCoinModal={openEditCoinModal}
      handleCreateCoinListing={handleCreateCoinListing as any}
      handleSaveCoinFees={handleSaveCoinFees}
      handleSaveCoinDetails={handleSaveCoinDetails}
      handleDeleteCoin={handleDeleteCoin}
      handleToggleCoinPublish={handleToggleCoinPublish}
      handleCoinLogoChange={handleCoinLogoChange as any}
    />
  );

  expect(screen.getByText(/Coin Listings/i)).toBeTruthy();
  const addBtn = screen.getByText(/Add Coin/i);
  fireEvent.click(addBtn);
  expect(handleCreateCoinListing).toHaveBeenCalled();
});
