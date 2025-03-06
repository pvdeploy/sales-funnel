'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DashboardStats from '@/components/DashboardStats';
import FunnelChart from '@/components/FunnelChart';
import RecentActivity from '@/components/RecentActivity';
import DateRangePicker from '@/components/DateRangePicker';

export default function Home() {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  });

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Sales Dashboard</h1>
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
          </div>
          
          <div className="mt-6">
            <DashboardStats />
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <div className="w-full">
              <FunnelChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
            </div>
          </div>
          
          <div className="mt-6">
            <RecentActivity />
          </div>
        </div>
      </div>
    </main>
  );
}
