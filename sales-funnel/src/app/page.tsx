import Navigation from '@/components/Navigation';
import DashboardStats from '@/components/DashboardStats';
import FunnelChart from '@/components/FunnelChart';
import RecentActivity from '@/components/RecentActivity';

export default function Home() {
  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Sales Dashboard</h1>
          
          <div className="mt-6">
            <DashboardStats />
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900">Sales Funnel</h2>
            <div className="mt-4 h-64">
              <FunnelChart />
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
