'use client';

import { useState, useEffect } from 'react';

interface Deal {
  id: number;
  leadName: string;
  dealName: string;
  value: number;
  currency: string;
  status: 'OPEN' | 'WON' | 'LOST';
  stage: string;
  createdAt: string;
}

const DealsList = () => {
  // This would come from your database in a real application
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 1,
      leadName: 'Acme Corp',
      dealName: 'Enterprise License',
      value: 50000,
      currency: 'USD',
      status: 'OPEN',
      stage: 'PROPOSAL_SENT',
      createdAt: '2023-05-01T10:00:00',
    },
    {
      id: 2,
      leadName: 'Widget Inc',
      dealName: 'Annual Subscription',
      value: 25000,
      currency: 'USD',
      status: 'OPEN',
      stage: 'NEGOTIATION',
      createdAt: '2023-05-05T14:30:00',
    },
    {
      id: 3,
      leadName: 'Tech Solutions',
      dealName: 'Custom Implementation',
      value: 75000,
      currency: 'USD',
      status: 'WON',
      stage: 'CLOSED_WON',
      createdAt: '2023-04-15T09:15:00',
    },
    {
      id: 4,
      leadName: 'Global Systems',
      dealName: 'Starter Package',
      value: 10000,
      currency: 'USD',
      status: 'OPEN',
      stage: 'MEETING_SCHEDULED',
      createdAt: '2023-05-10T11:45:00',
    },
    {
      id: 5,
      leadName: 'Data Insights',
      dealName: 'Enterprise Solution',
      value: 60000,
      currency: 'USD',
      status: 'LOST',
      stage: 'CLOSED_LOST',
      createdAt: '2023-04-20T16:00:00',
    },
  ]);

  // State to store formatted dates and currency values
  const [formattedDates, setFormattedDates] = useState<Record<number, string>>({});
  const [formattedCurrencies, setFormattedCurrencies] = useState<Record<number, string>>({});

  // Format dates and currencies on the client side only
  useEffect(() => {
    const dates: Record<number, string> = {};
    const currencies: Record<number, string> = {};
    
    deals.forEach(deal => {
      // Format dates
      const date = new Date(deal.createdAt);
      dates[deal.id] = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
      
      // Format currencies
      currencies[deal.id] = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: deal.currency,
      }).format(deal.value);
    });
    
    setFormattedDates(dates);
    setFormattedCurrencies(currencies);
  }, [deals]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-blue-100 text-blue-800';
      case 'WON':
        return 'bg-green-100 text-green-800';
      case 'LOST':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case 'CONTACTED':
        return 'bg-gray-100 text-gray-800';
      case 'MEETING_SCHEDULED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROPOSAL_SENT':
        return 'bg-blue-100 text-blue-800';
      case 'NEGOTIATION':
        return 'bg-purple-100 text-purple-800';
      case 'CLOSED_WON':
        return 'bg-green-100 text-green-800';
      case 'CLOSED_LOST':
        return 'bg-red-100 text-red-800';
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
                    Deal Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stage
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
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{deal.dealName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.leadName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formattedCurrencies[deal.id] || 'Loading...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          deal.status
                        )}`}
                      >
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageBadgeColor(
                          deal.stage
                        )}`}
                      >
                        {deal.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formattedDates[deal.id] || 'Loading...'}
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

export default DealsList; 