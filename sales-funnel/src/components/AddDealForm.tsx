'use client';

import { useState } from 'react';

interface AddDealFormProps {
  onAddDeal: (deal: Deal) => void;
}

export type Deal = {
  id: number;
  leadName: string;
  dealName: string;
  value: number;
  currency: string;
  status: 'OPEN' | 'WON' | 'LOST';
  stage: string;
  createdAt: string;
};

const AddDealForm = ({ onAddDeal }: AddDealFormProps) => {
  const [deal, setDeal] = useState<Deal>({
    id: Date.now(),
    leadName: '',
    dealName: '',
    value: 0,
    currency: 'USD',
    status: 'OPEN',
    stage: 'CONTACTED',
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDeal(deal);
    setDeal({
      id: Date.now(),
      leadName: '',
      dealName: '',
      value: 0,
      currency: 'USD',
      status: 'OPEN',
      stage: 'CONTACTED',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Lead Name</label>
        <input
          type="text"
          name="leadName"
          value={deal.leadName}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Deal Name</label>
        <input
          type="text"
          name="dealName"
          value={deal.dealName}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Value</label>
        <input
          type="number"
          name="value"
          value={deal.value}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          name="currency"
          value={deal.currency}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={deal.status}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="OPEN">Open</option>
          <option value="WON">Won</option>
          <option value="LOST">Lost</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Stage</label>
        <select
          name="stage"
          value={deal.stage}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="CONTACTED">Contacted</option>
          <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
          <option value="PROPOSAL_SENT">Proposal Sent</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="CLOSED_WON">Closed Won</option>
          <option value="CLOSED_LOST">Closed Lost</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Deal
        </button>
      </div>
    </form>
  );
};

export default AddDealForm; 