'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ActivitiesList from '@/components/ActivitiesList';
import LogActivityForm from '@/components/LogActivityForm';
import { Activity } from '@/components/LogActivityForm';

export default function ActivitiesPage() {
  const [showLogActivityForm, setShowLogActivityForm] = useState(false);

  const handleLogActivityClick = () => {
    setShowLogActivityForm(!showLogActivityForm);
  };

  const handleLogActivity = (activity: Activity) => {
    // Logic to log activity to the database or state
    console.log('Activity logged:', activity);
    setShowLogActivityForm(false);
  };

  return (
    <main>
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Activities</h1>
            <button
              type="button"
              onClick={handleLogActivityClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showLogActivityForm ? 'Cancel' : 'Log New Activity'}
            </button>
          </div>
          
          {showLogActivityForm && (
            <div className="mt-6">
              <LogActivityForm onLogActivity={handleLogActivity} />
            </div>
          )}
          
          <div className="mt-6">
            <ActivitiesList />
          </div>
        </div>
      </div>
    </main>
  );
} 