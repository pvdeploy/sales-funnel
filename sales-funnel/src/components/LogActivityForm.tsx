'use client';

import { useState } from 'react';

interface LogActivityFormProps {
  onLogActivity: (activity: Activity) => void;
}

export type Activity = {
  id: number;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'FOLLOW_UP' | 'DEMO';
  contactName: string;
  companyName: string;
  description: string;
  date: string;
};

const LogActivityForm = ({ onLogActivity }: LogActivityFormProps) => {
  const [activity, setActivity] = useState<Activity>({
    id: Date.now(),
    type: 'EMAIL',
    contactName: '',
    companyName: '',
    description: '',
    date: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogActivity(activity);
    setActivity({
      id: Date.now(),
      type: 'EMAIL',
      contactName: '',
      companyName: '',
      description: '',
      date: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
        <input
          type="text"
          name="contactName"
          value={activity.contactName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={activity.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
        <select
          name="type"
          value={activity.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="EMAIL">Email</option>
          <option value="CALL">Call</option>
          <option value="MEETING">Meeting</option>
          <option value="FOLLOW_UP">Follow Up</option>
          <option value="DEMO">Demo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={activity.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log Activity
        </button>
      </div>
    </form>
  );
};

export default LogActivityForm; 