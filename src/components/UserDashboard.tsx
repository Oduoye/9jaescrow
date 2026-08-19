@@
-import React from 'react';
+import React from 'react';
+import TradeTab from './dashboard/TradeTab';
@@
-          {activeView === 'trade' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Trade</h3>
-                <p className="text-xs text-slate-500">Create and manage buy/sell trades on the platform.</p>
-              </div>
-
-              <div className="bg-white border border-slate-100 rounded-xl p-4">
-                <div className="flex items-center justify-between">
-                  <div className="text-sm text-slate-500">Pending Orders: <span className="font-bold text-amber-600">{pendingOrdersCount}</span></div>
-                  <button className="bg-emerald-600 text-white px-3 py-1 rounded">New Trade</button>
-                </div>
-
-                <div className="mt-4 divide-y divide-slate-100">
-                  {orders.length === 0 ? (
-                    <p className="text-sm text-slate-400 py-6">No trades yet.</p>
-                  ) : (
-                    orders.map(o => (
-                      <div key={o.id} className="py-3 flex items-center justify-between">
-                        <div>
-                          <div className="font-bold">{o.type.toUpperCase()} {o.cryptoAmount} {o.token}</div>
-                          <div className="text-xs text-slate-500">{formatNGT(o.createdAt)} • {o.userEmail}</div>
-                        </div>
-                        <div>
-                          <button onClick={() => setSelectedOrder(o)} className="text-sm text-slate-900">Details</button>
-                        </div>
-                      </div>
-                    ))
-                  )}
-                </div>
-              </div>
-            </div>
-          )}
+          {activeView === 'trade' && (
+            <TradeTab orders={orders} pendingOrdersCount={pendingOrdersCount} setSelectedOrder={(o) => setSelectedOrder(o)} />
+          )}
*** End Patch
