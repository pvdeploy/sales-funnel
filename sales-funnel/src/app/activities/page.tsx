'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ActivitiesList from '@/components/ActivitiesList';
import Modal from '@/components/Modal';
import LogActivityForm from '@/components/LogActivityForm';
import { Activity } from '@/components/LogActivityForm';

export default function ActivitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogActivityClick = () => {
    setIsModalOpen(true);
  };

  const handleLogActivity = (activity: Activity) => {
    setIsModalOpen(false);
    // Increment the refresh trigger to cause the list to reload
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Activities</h1>
            <Button onClick={handleLogActivityClick}>Log Activity</Button>
          </div>
          
          <ActivitiesList key={refreshTrigger} />
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Log New Activity</h2>
              <LogActivityForm onLogActivity={handleLogActivity} />
            </div>
          </Modal>
        </div>
      </div>
    </main>
  );
} 