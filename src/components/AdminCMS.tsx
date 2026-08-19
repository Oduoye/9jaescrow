@@
-import SettingsTab from './admin/SettingsTab';
-import KycTab from './admin/KycTab';
-import BulletinsTab from './admin/BulletinsTab';
-import CoinsTab from './admin/CoinsTab';
+import SettingsTab from './admin/SettingsTab';
+import KycTab from './admin/KycTab';
+import BulletinsTab from './admin/BulletinsTab';
+import CoinsTab from './admin/CoinsTab';
+import AccountsTab from './admin/AccountsTab';
@@
-          {activeTab === 'accounts' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Trader Directory & Actions</h3>
-                <p className="text-xs text-slate-500">Search, suspend, reinstate or terminate trader accounts from this panel.</p>
-              </div>
-
-              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
-                <div className="lg:col-span-2 space-y-3">
-                  {kycUsers.length === 0 ? (
-                    <p className="text-sm text-slate-400 py-6">No traders found.</p>
-                  ) : (
-                    <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-xl p-3">
-                      {kycUsers.map(t => (
-                        <div key={t.uid} className="py-3 flex items-start justify-between gap-4">
-                          <div>
-                            <div className="flex items-center gap-3">
-                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-mono text-sm">{t.firstName ? t.firstName.charAt(0).toUpperCase() : t.email.charAt(0).toUpperCase()}</div>
-                              <div>
-                                <div className="font-bold text-sm">{t.firstName ? `${t.firstName} ${t.lastName ?? ''}` : t.email}</div>
-                                <div className="text-xs text-slate-500">{t.email} • {t.phone ?? 'no phone'}</div>
-                              </div>
-                            </div>
-                            <div className="text-sm text-slate-700 mt-2">Joined: {formatNGT(t.createdAt)}</div>
-                          </div>
-
-                          <div className="flex flex-col items-end gap-2">
-                            <div className="flex gap-2">
-                              <button onClick={() => setSelectedTrader(t)} className="text-sm text-slate-800">View</button>
-                              {t.accountStatus !== 'suspended' && t.accountStatus !== 'terminated' && (
-                                <button onClick={() => handleSuspendUser(t.uid, t.email)} className="text-sm text-amber-600">Suspend</button>
-                              )}
-                              {t.accountStatus !== 'terminated' && (
-                                <button onClick={() => handleTerminateUser(t.uid, t.email)} className="text-sm text-rose-600">Terminate</button>
-                              )}
-                              {t.accountStatus === 'suspended' && (
-                                <button onClick={() => handleReinstateUser(t.uid, t.email)} className="text-sm text-emerald-600">Reinstate</button>
-                              )}
-                            </div>
-                            <div className="text-xs text-slate-400">Status: {t.accountStatus ?? 'active'}</div>
-                          </div>
-                        </div>
-                      ))}
-                    </div>
-                  )}
-                </div>
-
-                <aside className="bg-white border border-slate-100 rounded-xl p-4">
-                  {selectedTrader ? (
-                    <div className="space-y-3">
-                      <div className="flex items-start justify-between">
-                        <div>
-                          <div className="font-bold">{selectedTrader.firstName ? `${selectedTrader.firstName} ${selectedTrader.lastName ?? ''}` : selectedTrader.email}</div>
-                          <div className="text-xs text-slate-500">{selectedTrader.email} • {selectedTrader.phone ?? 'no phone'}</div>
-                        </div>
-                        <button onClick={() => setSelectedTrader(null)} className="text-sm text-slate-500">Close</button>
-                      </div>
-
-                      <div>
-                        <label className="block text-xs text-slate-500 mb-1">Action reason</label>
-                        <input value={traderActionReason} onChange={(e)=>setTraderActionReason(e.target.value)} placeholder="Reason for action" className="w-full px-3 py-2 border rounded-md text-sm" />
-                      </div>
-
-                      <div className="flex gap-2">
-                        <button onClick={() => selectedTrader && handleSuspendUser(selectedTrader.uid, selectedTrader.email)} disabled={isActioningTrader} className="bg-amber-600 text-white px-3 py-1 rounded">Suspend</button>
-                        <button onClick={() => selectedTrader && handleTerminateUser(selectedTrader.uid, selectedTrader.email)} disabled={isActioningTrader} className="bg-rose-600 text-white px-3 py-1 rounded">Terminate</button>
-                        <button onClick={() => selectedTrader && handleReinstateUser(selectedTrader.uid, selectedTrader.email)} disabled={isActioningTrader} className="bg-emerald-600 text-white px-3 py-1 rounded">Reinstate</button>
-                      </div>
-                    </div>
-                  ) : (
-                    <div className="text-sm text-slate-400">Select a trader to view details and take actions.</div>
-                  )}
-                </aside>
-              </div>
-            </div>
-          )}
+          {activeTab === 'accounts' && (
+            <AccountsTab
+              traders={kycUsers}
+              selectedTrader={selectedTrader}
+              setSelectedTrader={(u) => setSelectedTrader(u)}
+              traderActionReason={traderActionReason}
+              setTraderActionReason={setTraderActionReason}
+              isActioningTrader={isActioningTrader}
+              handleSuspendUser={handleSuspendUser}
+              handleTerminateUser={handleTerminateUser}
+              handleReinstateUser={handleReinstateUser}
+            />
+          )}
@@
 (end of AdminCMS.tsx accounts-block replacement)
