'use client';

import { useEffect, useState } from 'react';

interface DashboardStatsProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

interface StatItem {
  name: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const DashboardStats = ({ startDate, endDate }: DashboardStatsProps) => {
  const [stats, setStats] = useState<StatItem[]>([
    { name: 'Total Leads', value: '120', change: '+12%', trend: 'up' },
    { name: 'Active Deals', value: '42', change: '+8%', trend: 'up' },
    { name: 'Won This Period', value: '8', change: '+33%', trend: 'up' },
    { name: 'Conversion Rate', value: '18%', change: '+2%', trend: 'up' },
  ]);

  useEffect(() => {
    // In a real application, this would be an API call with the date range as parameters
    if (!startDate || !endDate) return;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mock different stats based on date range
    if (diffDays <= 1) {
      // Daily view
      setStats([
        { name: 'Total Leads', value: '12', change: '+20%', trend: 'up' },
        { name: 'Active Deals', value: '8', change: '+14%', trend: 'up' },
        { name: 'Won Today', value: '1', change: '0%', trend: 'neutral' },
        { name: 'Conversion Rate', value: '12%', change: '-3%', trend: 'down' },
      ]);
    } else if (diffDays <= 7) {
      // Weekly view
      setStats([
        { name: 'Total Leads', value: '45', change: '+15%', trend: 'up' },
        { name: 'Active Deals', value: '22', change: '+10%', trend: 'up' },
        { name: 'Won This Week', value: '4', change: '+33%', trend: 'up' },
        { name: 'Conversion Rate', value: '15%', change: '+5%', trend: 'up' },
      ]);
    } else if (diffDays <= 30) {
      // Monthly view
      setStats([
        { name: 'Total Leads', value: '120', change: '+12%', trend: 'up' },
        { name: 'Active Deals', value: '42', change: '+8%', trend: 'up' },
        { name: 'Won This Month', value: '8', change: '+33%', trend: 'up' },
        { name: 'Conversion Rate', value: '18%', change: '+2%', trend: 'up' },
      ]);
    } else if (diffDays <= 90) {
      // Quarterly view
      setStats([
        { name: 'Total Leads', value: '320', change: '+18%', trend: 'up' },
        { name: 'Active Deals', value: '85', change: '+12%', trend: 'up' },
        { name: 'Won This Quarter', value: '24', change: '+20%', trend: 'up' },
        { name: 'Conversion Rate', value: '22%', change: '+4%', trend: 'up' },
      ]);
    } else {
      // Yearly view
      setStats([
        { name: 'Total Leads', value: '950', change: '+25%', trend: 'up' },
        { name: 'Active Deals', value: '180', change: '+15%', trend: 'up' },
        { name: 'Won This Year', value: '75', change: '+18%', trend: 'up' },
        { name: 'Conversion Rate', value: '25%', change: '+7%', trend: 'up' },
      ]);
    }
  }, [startDate, endDate]);

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-2 flex items-center">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p className={`ml-2 flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stat.change}
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default DashboardStats; 