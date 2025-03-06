'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string; // Changed to string to match UUID from database
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  leadSource: string;
  industry: string | null;
  createdAt: string;
}

const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads from the API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/leads');
        
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }
        
        const data = await response.json();
        setLeads(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('Failed to load leads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // State to store formatted dates
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});

  // Format dates on the client side only
  useEffect(() => {
    const dates: Record<string, string> = {};
    leads.forEach(lead => {
      const date = new Date(lead.createdAt);
      dates[lead.id] = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    });
    setFormattedDates(dates);
  }, [leads]);

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'REFERRAL':
        return 'bg-green-100 text-green-800';
      case 'WEBSITE':
        return 'bg-blue-100 text-blue-800';
      case 'EVENT':
        return 'bg-purple-100 text-purple-800';
      case 'COLD_OUTREACH':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // If loading, show a loading state
  if (loading) {
    return <div className="flex justify-center py-10">Loading leads...</div>;
  }

  // If error, show an error message
  if (error) {
    return <div className="text-red-500 py-10">{error}</div>;
  }

  // If no leads, show a message
  if (leads.length === 0) {
    return <div className="py-10">No leads found. Create your first lead!</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company / Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Industry
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.companyName}</div>
                          <div className="text-sm text-gray-500">{lead.contactName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSourceBadgeColor(
                          lead.leadSource
                        )}`}
                      >
                        {lead.leadSource.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.industry || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formattedDates[lead.id] || 'Loading...'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsList; 