@@
-import DisputeChat from './DisputeChat';
-import SettingsTab from './admin/SettingsTab';
+import DisputeChat from './DisputeChat';
+import SettingsTab from './admin/SettingsTab';
+import KycTab from './admin/KycTab';
@@
-          {activeTab === 'kyc' && (
-            <div className="space-y-6">
-              <div>
-                <h3 className="text-lg font-bold text-slate-900 tracking-tight">KYC Review Queue</h3>
-                <p className="text-xs text-slate-500">Review identity documents and approve or request more information.</p>
-              </div>
-
-              {kycUsers.length === 0 ? (
-                <p className="text-sm text-slate-400 py-12 text-center">No KYC submissions pending review.</p>
-              ) : (
-                <div className="divide-y divide-slate-100">
-                  {kycUsers.map((u) => (
-                    <div key={u.uid} className="py-4 flex items-center justify-between gap-4 text-xs">
-                      <div>
-                        <div className="flex items-center gap-2">
-                          <span className="font-mono text-sm font-bold">{u.firstName ? `${u.firstName} ${u.lastName ?? ''}` : u.email}</span>
-                          <span className={`inline-flex items-center text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
-                            u.kycStatus === 'pending' ? 'bg-amber-50 text-amber-700' : u.kycStatus === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
-                          }`}>
-                            {u.kycStatus}
-                          </span>
-                        </div>
-                        <div className="text-slate-500 mt-1">Submitted: {formatNGT(u.kycSubmittedAt ?? u.createdAt)}</div>
-                      </div>
-
-                      <div className="flex items-center gap-3">
-                        <button
-                          onClick={() => setSelectedKycUser(u)}
-                          className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer"
-                        >
-                          Review Documents
-                        </button>
-                      </div>
-                    </div>
-                  ))}
-                </div>
-              )}
-            </div>
-          )}
+          {activeTab === 'kyc' && (
+            <KycTab kycUsers={kycUsers} setSelectedKycUser={(u) => setSelectedKycUser(u)} />
+          )}
@@
 (end of AdminCMS.tsx kyc-block replacement)
