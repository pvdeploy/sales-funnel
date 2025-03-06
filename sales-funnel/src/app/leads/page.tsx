'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import LeadsList from '@/components/LeadsList';
import Modal from '@/components/Modal';
import AddLeadForm from '@/components/AddLeadForm';
import { Lead } from '@/components/AddLeadForm';

export default function LeadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddLeadClick = () => {
    setIsModalOpen(true);
  };

  const handleAddLead = (lead: Lead) => {
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
            <h1 className="text-2xl font-bold">Leads</h1>
            <Button onClick={handleAddLeadClick}>Add Lead</Button>
          </div>
          
          <LeadsList key={refreshTrigger} />
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
              <AddLeadForm onAddLead={handleAddLead} />
            </div>
          </Modal>
        </div>
      </div>
    </main>
  );
} 