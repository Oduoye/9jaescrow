*** Begin Patch
*** Update File: src/components/UserDashboard.tsx
@@
-import TradeTab from './dashboard/TradeTab';
+import TradeTab from './dashboard/TradeTab';
+import HistoryTab from './dashboard/HistoryTab';
@@
-          {activeView === 'history' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">History</h3>
-                <p className="text-xs text-slate-500">Your trade and transaction history with quick filters.</p>
-              </div>
-
-              <div className="bg-white border border-slate-100 rounded-xl p-4">
-                {orders.length === 0 ? (
-                  <p className="text-sm text-slate-400 py-6">No transactions to show.</p>
-                ) : (
-                  <div className="divide-y divide-slate-100">
-                    {orders.map(o => (
-                      <div key={o.id} className="py-3 flex items-center justify-between">
-                        <div>
-                          <div className="font-bold">{o.type.toUpperCase()} {o.cryptoAmount} {o.token}</div>
-                          <div className="text-xs text-slate-500">{formatNGT(o.createdAt)} • {o.status}</div>
-                        </div>
-                        <div className="text-sm text-slate-600">₦{o.ngnAmount?.toLocaleString() ?? '-'}</div>
-                      </div>
-                    ))}
-                  </div>
-                )}
-              </div>
-            </div>
-          )}
+          {activeView === 'history' && (
+            <HistoryTab orders={orders} />
+          )}
*** End Patch
