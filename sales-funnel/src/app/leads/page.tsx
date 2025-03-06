import Navigation from '@/components/Navigation';
import LeadsList from '@/components/LeadsList';

export default function LeadsPage() {
  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Lead
            </button>
          </div>
          
          <div className="mt-6">
            <LeadsList />
          </div>
        </div>
      </div>
    </main>
  );
} 