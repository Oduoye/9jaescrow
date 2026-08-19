@@
-import DisputesTab from './admin/DisputesTab';
+import DisputesTab from './admin/DisputesTab';
+import ComplianceTab from './admin/ComplianceTab';
@@
-          {activeTab === 'compliance' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Compliance & Reactivations</h3>
-                <p className="text-xs text-slate-500">Review flagged accounts, perform manual checks, and reactivate pending reactivations.</p>
-              </div>
-
-              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
-                <div className="lg:col-span-2">
-                  <div className="bg-white border border-slate-100 rounded-xl p-4">
-                    <h4 className="font-bold text-sm mb-2">Search Pending Reactivations</h4>
-                    <div className="flex gap-2">
-                      <input
-                        value={reactivationSearchEmail}
-                        onChange={(e) => setReactivationSearchEmail(e.target.value)}
-                        placeholder="User email to reactivate"
-                        className="px-3 py-2 border rounded-lg flex-1"
-                      />
-                      <button
-                        onClick={() => {
-                          // The actual handler expects a uid; AdminCMS will call handleReactivatePendingUser with the selected user's uid after lookup.
-                          // This button is a helper to call reactivate if complianceViewUser is loaded and matches the email.
-                          if (!complianceViewUser) return;
-                          handleReactivatePendingUser(complianceViewUser.uid, complianceViewUser.email);
-                        }}
-                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
-                        disabled={isReactivating || !complianceViewUser}
-                      >
-                        {isReactivating ? 'Reactivating...' : 'Reactivate Selected'}
-                      </button>
-                    </div>
-                    <p className="text-xs text-slate-400 mt-2">Tip: Paste an email used during registration to search for reactivation candidates.</p>
-                  </div>
-
-                  <div className="mt-4 bg-white border border-slate-100 rounded-xl p-4">
-                    <h4 className="font-bold text-sm mb-2">Flagged Account</h4>
-                    {complianceViewUser ? (
-                      <div className="space-y-2">
-                        <div className="font-bold">{complianceViewUser.firstName ? `${complianceViewUser.firstName} ${complianceViewUser.lastName ?? ''}` : complianceViewUser.email}</div>
-                        <div className="text-xs text-slate-500">Email: {complianceViewUser.email}</div>
-                        <div className="text-xs text-slate-500">Joined: {formatNGT(complianceViewUser.createdAt)}</div>
-                        <div className="text-sm text-slate-700">KYC Status: {complianceViewUser.kycStatus ?? 'unknown'}</div>
-                        <div className="flex gap-2 pt-2">
-                          <button onClick={() => setComplianceViewUser(null)} className="text-sm text-slate-600">Clear</button>
-                          <button onClick={() => handleReactivatePendingUser(complianceViewUser.uid, complianceViewUser.email)} className="text-sm text-emerald-600">Reactivate</button>
-                        </div>
-                      </div>
-                    ) : (
-                      <div className="text-sm text-slate-400">No flagged user selected. Use the search box to locate pending reactivations.</div>
-                    )}
-                  </div>
-                </div>
-
-                <aside className="bg-white border border-slate-100 rounded-xl p-4">
-                  <h4 className="font-bold text-sm">Compliance Actions</h4>
-                  <p className="text-xs text-slate-500 mt-2">Manual checks, watchlist status, and external sanctions screening are available here.</p>
-                  <div className="text-sm text-slate-400 mt-4">No automated screening integrated in this UI. Use external tools as needed.</div>
-                </aside>
-              </div>
-            </div>
-          )}
+          {activeTab === 'compliance' && (
+            <ComplianceTab
+              complianceViewUser={complianceViewUser}
+              setComplianceViewUser={(u) => setComplianceViewUser(u)}
+              reactivationSearchEmail={reactivationSearchEmail}
+              setReactivationSearchEmail={(v) => setReactivationSearchEmail(v)}
+              isReactivating={isReactivating}
+              handleReactivatePendingUser={handleReactivatePendingUser}
+            />
+          )}
@@
 (end of AdminCMS.tsx compliance-block replacement)
