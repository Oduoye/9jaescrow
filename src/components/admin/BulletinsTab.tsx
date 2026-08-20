import React from 'react';
import { Announcement } from '../../types';
import { formatNGT } from '../../lib/dateUtils';

type Props = {
  announcements: Announcement[];
  bulletinTitle: string;
  setBulletinTitle: (v: string) => void;
  bulletinContent: string;
  setBulletinContent: (v: string) => void;
  bulletinScope: Announcement['scope'];
  setBulletinScope: (v: Announcement['scope']) => void;
  isCreatingBulletin: boolean;
  editingAnn: string | null;
  editTitle: string;
  setEditTitle: (v: string) => void;
  editContent: string;
  setEditContent: (v: string) => void;
  editScope: Announcement['scope'];
  setEditScope: (v: Announcement['scope']) => void;
  isSavingEdit: boolean;
  handleCreateBulletin: (e: React.FormEvent) => void;
  handleDeactivateBulletin: (id: string) => void;
  handleHardDeleteBulletin: (id: string, title: string) => void;
  handleSaveEdit: () => void;
  showArchivedBulletins: boolean;
  setShowArchivedBulletins: (v: boolean) => void;
};

export default function BulletinsTab({
  announcements,
  bulletinTitle,
  setBulletinTitle,
  bulletinContent,
  setBulletinContent,
  bulletinScope,
  setBulletinScope,
  isCreatingBulletin,
  editingAnn,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  editScope,
  setEditScope,
  isSavingEdit,
  handleCreateBulletin,
  handleDeactivateBulletin,
  handleHardDeleteBulletin,
  handleSaveEdit,
  showArchivedBulletins,
  setShowArchivedBulletins
}: Props) {
  const activeList = showArchivedBulletins ? announcements.filter(a => !a.isActive) : announcements.filter(a => a.isActive);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Announcements & Bulletins</h3>
        <p className="text-xs text-slate-500">Post updates to users, create scoped alerts, and archive old messages.</p>
      </div>

      {/* Create form */}
      <form onSubmit={handleCreateBulletin} className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={bulletinTitle}
            onChange={(e) => setBulletinTitle(e.target.value)}
            placeholder="Title"
            className="col-span-3 sm:col-span-2 px-3 py-2 border border-slate-200 rounded-lg text-sm"
            required
          />

          <select
            value={bulletinScope}
            onChange={(e) => setBulletinScope(e.target.value as Announcement['scope'])}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
          >
            <option value="all">All users</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <textarea
          value={bulletinContent}
          onChange={(e) => setBulletinContent(e.target.value)}
          placeholder="Details"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-24"
          required
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">Create announcement for immediate publishing.</div>
          <button
            type="submit"
            disabled={isCreatingBulletin}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            {isCreatingBulletin ? 'Publishing...' : 'Publish Announcement'}
          </button>
        </div>
      </form>

      {/* Edit drawer */}
      {editingAnn && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-sm">Editing Announcement</h4>
          <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          <textarea value={editContent} onChange={(e)=>setEditContent(e.target.value)} className="w-full px-3 py-2 border rounded-md h-28" />
          <div className="flex items-center justify-between">
            <select value={editScope} onChange={(e)=>setEditScope(e.target.value as Announcement['scope'])} className="px-3 py-2 border rounded-md">
              <option value="all">All users</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <div className="flex gap-2">
              <button onClick={handleSaveEdit} disabled={isSavingEdit} className="bg-emerald-600 text-white px-3 py-1 rounded">{isSavingEdit ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm">{showArchivedBulletins ? 'Archived' : 'Published'} Announcements</h4>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showArchivedBulletins} onChange={(e)=>setShowArchivedBulletins(e.target.checked)} /> Show archived</label>
        </div>

        {activeList.length === 0 ? (
          <p className="text-sm text-slate-400 py-6">No announcements to show.</p>
        ) : (
          <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-xl p-3">
            {activeList.map(a => (
              <div key={a.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.scope} • {formatNGT(a.createdAt)}</div>
                    <div className="text-sm text-slate-700 mt-2">{a.content}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      {a.isActive && <button onClick={()=>handleDeactivateBulletin(a.id)} className="text-sm text-amber-600">Archive</button>}
                      <button onClick={()=>handleHardDeleteBulletin(a.id, a.title)} className="text-sm text-rose-600">Delete</button>
                    </div>
                    <div className="text-xs text-slate-400">ID: {a.id.substring(0,8)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
