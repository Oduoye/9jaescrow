import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import DisputeChat from '../DisputeChat';
import { formatNGT } from '../../lib/dateUtils';
import { Dispute, UserProfile } from '../../types';

type Props = {
  disputes: Dispute[];
  expandedDisputeIds: Set<string>;
  setExpandedDisputeIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  hasMoreDisputes?: boolean;
  onLoadMoreDisputes?: () => void;
  setLightboxUrl: (u: string | null) => void;
  currentUserId: string;
  currentUserEmail: string;
  currentUserDisplayName?: string;
};

export default function DisputesTab({
  disputes,
  expandedDisputeIds,
  setExpandedDisputeIds,
  hasMoreDisputes,
  onLoadMoreDisputes,
  setLightboxUrl,
  currentUserId,
  currentUserEmail,
  currentUserDisplayName,
}: Props) {
  if (!disputes || disputes.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E0E7E0] shadow-sm space-y-5">
        <div className="text-center py-16 px-4">
          <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h4 className="text-sm font-bold text-slate-700">No Disputes Filed</h4>
          <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
            If you have an issue with a rejected order, you can open a dispute from the receipt in your Order History.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E0E7E0] shadow-sm space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">My Disputes</h3>
          <p className="text-xs text-gray-500">Track and follow up on your trade disputes with the 9ija Escrow team.</p>
        </div>
        {disputes.filter(d => d.status === 'open').length > 0 && (
          <span className="shrink-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
            {disputes.filter(d => d.status === 'open').length} Open
          </span>
        )}
      </div>

      <div className="space-y-3">
        {disputes.map((d) => {
          const isExpanded = expandedDisputeIds.has(d.id);
          const isOpen = d.status === 'open';
          const toggleExpand = () => setExpandedDisputeIds(prev => {
            const next = new Set(prev);
            if (next.has(d.id)) next.delete(d.id); else next.add(d.id);
            return next;
          });

          return (
            <div
              key={d.id}
              className={`rounded-2xl border overflow-hidden ${isOpen ? 'border-amber-200' : 'border-[#E0E7E0]'}`}
            >
              <button
                onClick={toggleExpand}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer transition-colors ${isOpen ? 'bg-amber-50/60 hover:bg-amber-50' : 'bg-white hover:bg-[#F7F9F7]'}`}
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${isOpen ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-[#1A1A1A]">Order #{d.orderId.substring(0, 6).toUpperCase()}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isOpen ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}`}>
                      {isOpen ? '● OPEN' : '✓ RESOLVED'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5 truncate max-w-[200px]">{d.message}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{formatNGT(d.createdAt)}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {isExpanded && (
                <div className={`px-4 pb-4 pt-3 border-t ${isOpen ? 'border-amber-200/60 bg-amber-50/20' : 'border-[#E0E7E0] bg-white'}`}>
                  <DisputeChat
                    disputeId={d.id}
                    currentUserId={currentUserId}
                    currentUserEmail={currentUserEmail}
                    currentUserRole="user"
                    isOpen={isOpen}
                    currentUserDisplayName={currentUserDisplayName}
                    initialMessage={d.message}
                    initialMessageAt={d.createdAt}
                    initialMessageEmail={currentUserEmail}
                    initialMessageDisplayName={currentUserDisplayName}
                    evidenceUrls={d.imageUrls}
                    adminResponse={d.adminResponse}
                    resolvedAt={d.resolvedAt}
                    onEvidenceClick={(url) => setLightboxUrl(url)}
                  />
                </div>
              )}
            </div>
          );
        })}

        {hasMoreDisputes && onLoadMoreDisputes && (
          <button
            onClick={onLoadMoreDisputes}
            className="w-full py-3 text-xs font-bold text-[#008751] border border-[#008751]/30 rounded-xl hover:bg-[#F0F7F2] transition cursor-pointer uppercase tracking-wide"
          >
            Load More Disputes
          </button>
        )}
      </div>
    </div>
  );
}
