'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LeadsList from '@/components/LeadsList';
import AddLeadForm from '@/components/AddLeadForm';
import { Lead } from '@/components/AddLeadForm';
import Modal from '@/components/Modal';

export default function LeadsPage() {
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);

  const handleAddLeadClick = () => {
    setShowAddLeadForm(!showAddLeadForm);
  };

  const handleAddLead = (lead: Lead) => {
    // Logic to add lead to the database or state
    console.log('Lead added:', lead);
    setShowAddLeadForm(false);
  };

  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
            <button
              type="button"
              onClick={handleAddLeadClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showAddLeadForm ? 'Cancel' : 'Add New Lead'}
            </button>
          </div>
          
          <Modal isOpen={showAddLeadForm} onClose={handleAddLeadClick}>
            <AddLeadForm onAddLead={handleAddLead} />
          </Modal>
          
          <div className="mt-6">
            <LeadsList />
          </div>
        </div>
      </div>
    </main>
  );
} 