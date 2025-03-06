'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import DealsList from '@/components/DealsList';
import Modal from '@/components/Modal';
import AddDealForm from '@/components/AddDealForm';
import { Deal } from '@/components/AddDealForm';

export default function DealsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddDealClick = () => {
    setIsModalOpen(true);
  };

  const handleAddDeal = (deal: Deal) => {
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
            <h1 className="text-2xl font-bold">Deals</h1>
            <Button onClick={handleAddDealClick}>Add Deal</Button>
          </div>
          
          <DealsList key={refreshTrigger} />
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Deal</h2>
              <AddDealForm onAddDeal={handleAddDeal} />
            </div>
          </Modal>
        </div>
      </div>
    </main>
  );
} 