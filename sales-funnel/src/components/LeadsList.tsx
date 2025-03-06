'use client';

import { useState, useEffect } from 'react';

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

const LeadsList = () => {
  // This would come from your database in a real application
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      companyName: 'Acme Corp',
      contactName: 'John Doe',
      email: 'john@acmecorp.com',
      phone: '+1 555-123-4567',
      leadSource: 'REFERRAL',
      industry: 'Technology',
      createdAt: '2023-05-01T10:00:00',
    },
    {
      id: 2,
      companyName: 'Widget Inc',
      contactName: 'Jane Smith',
      email: 'jane@widgetinc.com',
      phone: '+1 555-765-4321',
      leadSource: 'WEBSITE',
      industry: 'Manufacturing',
      createdAt: '2023-05-02T14:30:00',
    },
    {
      id: 3,
      companyName: 'Tech Solutions',
      contactName: 'Robert Johnson',
      email: 'robert@techsolutions.com',
      phone: '+1 555-987-6543',
      leadSource: 'EVENT',
      industry: 'Information Technology',
      createdAt: '2023-05-03T09:15:00',
    },
    {
      id: 4,
      companyName: 'Global Systems',
      contactName: 'Sarah Williams',
      email: 'sarah@globalsystems.com',
      phone: '+1 555-456-7890',
      leadSource: 'COLD_OUTREACH',
      industry: 'Healthcare',
      createdAt: '2023-05-04T11:45:00',
    },
    {
      id: 5,
      companyName: 'Data Insights',
      contactName: 'Michael Brown',
      email: 'michael@datainsights.com',
      phone: '+1 555-234-5678',
      leadSource: 'OTHER',
      industry: 'Finance',
      createdAt: '2023-05-05T16:00:00',
    },
  ]);

  // State to store formatted dates
  const [formattedDates, setFormattedDates] = useState<Record<number, string>>({});

  // Format dates on the client side only
  useEffect(() => {
    const dates: Record<number, string> = {};
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
                      {lead.industry}
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