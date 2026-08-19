@@
-import SettingsTab from './admin/SettingsTab';
-import KycTab from './admin/KycTab';
-import BulletinsTab from './admin/BulletinsTab';
+import SettingsTab from './admin/SettingsTab';
+import KycTab from './admin/KycTab';
+import BulletinsTab from './admin/BulletinsTab';
+import CoinsTab from './admin/CoinsTab';
@@
-          {activeTab === 'coins' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Coin Listings</h3>
-                <p className="text-xs text-slate-500">Manage tokens available for trading, fees, and which networks are active.</p>
-              </div>
-
-              {/* Create form */}
-              <form onSubmit={handleCreateCoinListing} className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
-                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
-                  <input value={coinName} onChange={(e)=>setCoinName(e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-lg" required />
-                  <input value={coinSymbol} onChange={(e)=>setCoinSymbol(e.target.value)} placeholder="Symbol" className="px-3 py-2 border rounded-lg" required />
-                  <input value={coinNetwork} onChange={(e)=>setCoinNetwork(e.target.value)} placeholder="Network" className="px-3 py-2 border rounded-lg" required />
-                </div>
-
-                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
-                  <input value={coinWalletAddress} onChange={(e)=>setCoinWalletAddress(e.target.value)} placeholder="Wallet Address" className="px-3 py-2 border rounded-lg" required />
-                  <input type="number" value={coinRate} onChange={(e)=>setCoinRate(Number(e.target.value))} placeholder="Rate" className="px-3 py-2 border rounded-lg" required />
-                  <input type="number" value={coinFeePercentage} onChange={(e)=>setCoinFeePercentage(Number(e.target.value))} placeholder="Fee %" className="px-3 py-2 border rounded-lg" />
-                </div>
-
-                <div className="flex items-center gap-3">
-                  <input type="file" accept="image/*" onChange={handleCoinLogoChange} />
-                  <div className="text-xs text-slate-500">Logo (512x512 recommended)</div>
-                </div>
-
-                <div className="flex items-center justify-between">
-                  <div className="text-xs text-slate-500">Create a new coin listing to make it available on the platform.</div>
-                  <button type="submit" disabled={isCreatingCoin} className="bg-emerald-600 text-white px-4 py-2 rounded-md">
-                    {isCreatingCoin ? 'Adding...' : 'Add Coin'}
-                  </button>
-                </div>
-              </form>
-
-              {/* Existing coins list */}
-              <div className="space-y-3">
-                {coins.length === 0 ? (
-                  <p className="text-sm text-slate-400 py-6">No coins listed yet.</p>
-                ) : (
-                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-xl p-3">
-                    {coins.map(c => (
-                      <div key={c.id} className="py-3 flex items-start justify-between gap-4">
-                        <div>
-                          <div className="flex items-center gap-3">
-                            <img src={c.logoUrl} alt="logo" className="w-10 h-10 rounded-md" />
-                            <div>
-                              <div className="font-bold text-sm">{c.name} ({c.symbol})</div>
-                              <div className="text-xs text-slate-500">Network: {c.network} • Rate: ₦{c.rate}</div>
-                            </div>
-                          </div>
-                          <div className="text-sm text-slate-700 mt-2">Min trade: {c.minTradeAmount} • Fee: {c.feePercentage}%</div>
-                        </div>
-
-                        <div className="flex flex-col items-end gap-2">
-                          <div className="flex gap-2">
-                            <button onClick={()=>openEditCoinModal(c)} className="text-sm text-slate-800">Edit</button>
-                            <button onClick={()=>handleToggleCoinPublish(c.id, !!c.published, c.name)} className="text-sm text-emerald-600">{c.published ? 'Unpublish' : 'Publish'}</button>
-                            <button onClick={()=>handleDeleteCoin(c.id, c.name)} className="text-sm text-rose-600">Delete</button>
-                          </div>
-
-                          <div className="text-xs text-slate-400">Created: {formatNGT(c.createdAt)}</div>
-                        </div>
-                      </div>
-                    ))}
-                  </div>
-                )}
-              </div>
-            </div>
-          )}
+          {activeTab === 'coins' && (
+            <CoinsTab
+              coins={coins}
+              coinName={coinName}
+              setCoinName={setCoinName}
+              coinSymbol={coinSymbol}
+              setCoinSymbol={setCoinSymbol}
+              coinNetwork={coinNetwork}
+              setCoinNetwork={setCoinNetwork}
+              coinWalletAddress={coinWalletAddress}
+              setCoinWalletAddress={setCoinWalletAddress}
+              coinRate={coinRate}
+              setCoinRate={setCoinRate}
+              coinLogoUrl={coinLogoUrl}
+              setCoinLogoUrl={setCoinLogoUrl}
+              coinFeePercentage={coinFeePercentage}
+              setCoinFeePercentage={setCoinFeePercentage}
+              coinMinTradeAmount={coinMinTradeAmount}
+              setCoinMinTradeAmount={setCoinMinTradeAmount}
+              coinMinBuyAmount={coinMinBuyAmount}
+              setCoinMinBuyAmount={setCoinMinBuyAmount}
+              coinMinSellAmount={coinMinSellAmount}
+              setCoinMinSellAmount={setCoinMinSellAmount}
+              coinPricePegged={coinPricePegged}
+              setCoinPricePegged={setCoinPricePegged}
+              coinGeckoId={coinGeckoId}
+              setCoinGeckoId={setCoinGeckoId}
+              isCreatingCoin={isCreatingCoin}
+              editingCoinId={editingCoinId}
+              setEditingCoinId={setEditingCoinId}
+              editFeePercent={editFeePercent}
+              setEditFeePercent={setEditFeePercent}
+              editMinAmount={editMinAmount}
+              setEditMinAmount={setEditMinAmount}
+              editMinBuyAmount={editMinBuyAmount}
+              setEditMinBuyAmount={setEditMinBuyAmount}
+              editMinSellAmount={editMinSellAmount}
+              setEditMinSellAmount={setEditMinSellAmount}
+              editPricePegged={editPricePegged}
+              setEditPricePegged={setEditPricePegged}
+              editCoinGeckoId={editCoinGeckoId}
+              setEditCoinGeckoId={setEditCoinGeckoId}
+              isSavingCoinFees={isSavingCoinFees}
+              showEditCoinModal={showEditCoinModal}
+              openEditCoinModal={(c) => openEditCoinModal(c)}
+              handleCreateCoinListing={handleCreateCoinListing}
+              handleSaveCoinFees={handleSaveCoinFees}
+              handleSaveCoinDetails={handleSaveCoinDetails}
+              handleDeleteCoin={handleDeleteCoin}
+              handleToggleCoinPublish={handleToggleCoinPublish}
+              handleCoinLogoChange={handleCoinLogoChange}
+            />
+          )}
@@
 (end of AdminCMS.tsx coins-block replacement)
