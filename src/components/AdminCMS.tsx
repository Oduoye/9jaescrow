@@
-import DisputeChat from './DisputeChat';
-import SettingsTab from './admin/SettingsTab';
-import KycTab from './admin/KycTab';
-import BulletinsTab from './admin/BulletinsTab';
-import CoinsTab from './admin/CoinsTab';
-import AccountsTab from './admin/AccountsTab';
+import DisputeChat from './DisputeChat';
+import SettingsTab from './admin/SettingsTab';
+import KycTab from './admin/KycTab';
+import BulletinsTab from './admin/BulletinsTab';
+import CoinsTab from './admin/CoinsTab';
+import AccountsTab from './admin/AccountsTab';
+import DisputesTab from './admin/DisputesTab';
@@
-          {activeTab === 'disputes' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Disputes</h3>
-                <p className="text-xs text-slate-500">View open disputes, read conversation history and send resolution responses.</p>
-              </div>
-
-              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
-                <div className="lg:col-span-2">
-                  {disputes.length === 0 ? (
-                    <p className="text-sm text-slate-400 py-8">No disputes found.</p>
-                  ) : (
-                    <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-xl p-3">
-                      {disputes.map(d => (
-                        <div key={d.id} className="py-3 flex items-start justify-between gap-4">
-                          <div>
-                            <div className="font-bold text-sm">{d.title}</div>
-                            <div className="text-xs text-slate-500">{d.status} • {formatNGT(d.createdAt)}</div>
-                            <div className="text-sm text-slate-700 mt-2">Order: {d.orderId} • User: {d.userEmail}</div>
-                          </div>
-
-                          <div className="flex flex-col items-end gap-2">
-                            <div className="flex gap-2">
-                              <button onClick={() => setSelectedDispute(d)} className="text-sm text-slate-800">Open</button>
-                              {d.status === 'open' && (
-                                <button onClick={() => handleResolveDispute(d.id)} className="text-sm text-emerald-600">Quick Resolve</button>
-                              )}
-                            </div>
-                            <div className="text-xs text-slate-400">ID: {d.id.substring(0,8)}</div>
-                          </div>
-                        </div>
-                      ))}
-
-                      {hasMoreDisputes && onLoadMoreDisputes && (
-                        <div className="pt-4 text-center">
-                          <button onClick={onLoadMoreDisputes} className="text-xs font-bold text-slate-600 border border-slate-200 bg-slate-50 px-4 py-2 rounded-xl">Load more</button>
-                        </div>
-                      )}
-                    </div>
-                  )}
-                </div>
-
-                <aside className="bg-white border border-slate-100 rounded-xl p-4">
-                  {selectedDispute ? (
-                    <div className="space-y-3">
-                      <div className="flex items-start justify-between">
-                        <div>
-                          <div className="font-bold">{selectedDispute.title}</div>
-                          <div className="text-xs text-slate-500">Order: {selectedDispute.orderId} • {selectedDispute.userEmail}</div>
-                        </div>
-                        <button onClick={() => setSelectedDispute(null)} className="text-sm text-slate-500">Close</button>
-                      </div>
-
-                      <div className="h-64 overflow-auto border rounded p-2">
-                        <DisputeChat disputeId={selectedDispute.id} />
-                      </div>
-
-                      <div>
-                        <label className="block text-xs text-slate-500 mb-1">Resolution message</label>
-                        <textarea value={disputeResponseText} onChange={(e)=>setDisputeResponseText(e.target.value)} placeholder="Write a message to both parties" className="w-full px-3 py-2 border rounded-md h-24 text-sm" />
-                      </div>
-
-                      <div className="flex gap-2">
-                        <button onClick={() => selectedDispute && handleResolveDispute(selectedDispute.id)} disabled={isResolvingDispute} className="bg-emerald-600 text-white px-3 py-1 rounded">{isResolvingDispute ? 'Resolving...' : 'Resolve Dispute'}</button>
-                      </div>
-                    </div>
-                  ) : (
-                    <div className="text-sm text-slate-400">Select a dispute to view conversation and respond.</div>
-                  )}
-                </aside>
-              </div>
-            </div>
-          )}
+          {activeTab === 'disputes' && (
+            <DisputesTab
+              disputes={disputes}
+              selectedDispute={selectedDispute}
+              setSelectedDispute={(d) => setSelectedDispute(d)}
+              disputeResponseText={disputeResponseText}
+              setDisputeResponseText={(v) => setDisputeResponseText(v)}
+              isResolvingDispute={isResolvingDispute}
+              handleResolveDispute={handleResolveDispute}
+              hasMoreDisputes={hasMoreDisputes}
+              onLoadMoreDisputes={onLoadMoreDisputes}
+            />
+          )}
@@
 (end of AdminCMS.tsx disputes-block replacement)
