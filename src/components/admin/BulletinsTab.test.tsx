import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BulletinsTab from './BulletinsTab';
import { vi } from 'vitest';

const sampleAnnouncements = [
  { id: 'ann1', title: 'Maintenance', content: 'Scheduled maintenance', scope: 'all', isActive: true, createdAt: new Date().toISOString() }
];

test('renders bulletins form and list, and calls create handler', () => {
  const handleCreateBulletin = vi.fn((e) => e.preventDefault());
  const handleDeactivateBulletin = vi.fn();
  const handleHardDeleteBulletin = vi.fn();
  const handleSaveEdit = vi.fn();

  render(
    <BulletinsTab
      announcements={sampleAnnouncements as any}
      bulletinTitle={''}
      setBulletinTitle={() => {}}
      bulletinContent={''}
      setBulletinContent={() => {}}
      bulletinScope={'all'}
      setBulletinScope={() => {}}
      isCreatingBulletin={false}
      editingAnn={null}
      editTitle={''}
      setEditTitle={() => {}}
      editContent={''}
      setEditContent={() => {}}
      editScope={'all'}
      setEditScope={() => {}}
      isSavingEdit={false}
      handleCreateBulletin={handleCreateBulletin as any}
      handleDeactivateBulletin={handleDeactivateBulletin}
      handleHardDeleteBulletin={handleHardDeleteBulletin}
      handleSaveEdit={handleSaveEdit}
      showArchivedBulletins={false}
      setShowArchivedBulletins={()=>{}}
    />
  );

  expect(screen.getByText(/Announcements & Bulletins/i)).toBeTruthy();
  const publishBtn = screen.getByText(/Publish Announcement/i);
  fireEvent.click(publishBtn);
  expect(handleCreateBulletin).toHaveBeenCalled();
});
