'use client';

import { useState, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2 
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface Deal {
  id: string; // Changed to string to match UUID from database
  dealName: string;
  dealValue: number;
  currency: string;
  status: 'OPEN' | 'WON' | 'LOST';
  stage: string;
  createdAt: string;
  lead: {
    id: string;
    companyName: string;
  };
}

const DealsList = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to handle deal deletion
  const handleDeleteDeal = async (id: string) => {
    // Confirm before deletion
    if (!confirm('Are you sure you want to delete this deal?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the deal from the state
        setDeals(deals.filter(deal => deal.id !== id));
      } else {
        console.error('Failed to delete deal');
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  };

  // Function to handle deal edit (placeholder for now)
  const handleEditDeal = (id: string) => {
    alert('Edit feature will be implemented soon!');
  };

  // Fetch deals from the API
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/deals');
        
        if (!response.ok) {
          throw new Error('Failed to fetch deals');
        }
        
        const data = await response.json();
        setDeals(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to load deals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // State to store formatted dates and currency values
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});
  const [formattedCurrencies, setFormattedCurrencies] = useState<Record<string, string>>({});

  // Format dates and currencies on the client side only
  useEffect(() => {
    const dates: Record<string, string> = {};
    const currencies: Record<string, string> = {};
    
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
      }).format(deal.dealValue);
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

  // If loading, show a loading state
  if (loading) {
    return <div className="flex justify-center py-10">Loading deals...</div>;
  }

  // If error, show an error message
  if (error) {
    return <div className="text-red-500 py-10">{error}</div>;
  }

  // If no deals, show a message
  if (deals.length === 0) {
    return <div className="py-10">No deals found. Create your first deal!</div>;
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
                  <th scope="col" className="relative px-6 py-3 w-10">
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
                      <div className="text-sm text-gray-900">{deal.lead?.companyName || 'N/A'}</div>
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
                          deal.stage || ''
                        )}`}
                      >
                        {deal.stage?.replace('_', ' ') || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formattedDates[deal.id] || 'Loading...'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditDeal(deal.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteDeal(deal.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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