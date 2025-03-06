'use client';

import { useState } from 'react';

interface Lead {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  leadSource: string;
  industry: string;
  createdAt: string;
}

interface AddLeadFormProps {
  onAddLead: (lead: Lead) => void;
}

export type { Lead };

const AddLeadForm = ({ onAddLead }: AddLeadFormProps) => {
  const [lead, setLead] = useState<Lead>({
    id: Date.now(),
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    leadSource: 'REFERRAL',
    industry: '',
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({ ...prevLead, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead(lead);
    setLead({
      id: Date.now(),
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      leadSource: 'REFERRAL',
      industry: '',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={lead.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
        <input
          type="text"
          name="contactName"
          value={lead.contactName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={lead.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={lead.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
        <select
          name="leadSource"
          value={lead.leadSource}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="REFERRAL">Referral</option>
          <option value="COLD_OUTREACH">Cold Outreach</option>
          <option value="EVENT">Event</option>
          <option value="WEBSITE">Website</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <input
          type="text"
          name="industry"
          value={lead.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Lead
        </button>
      </div>
    </form>
  );
};

export default AddLeadForm; 