'use client';

import { Fragment, useState, useEffect } from 'react';

const RecentActivity = () => {
  // These would come from your database in a real application
  const activities = [
    {
      id: 1,
      type: 'EMAIL',
      contactName: 'John Doe',
      companyName: 'Acme Corp',
      description: 'Follow-up on proposal',
      date: '2023-05-10T13:45:00',
    },
    {
      id: 2,
      type: 'CALL',
      contactName: 'Jane Smith',
      companyName: 'Widget Inc',
      description: 'Discussed timeline and budget',
      date: '2023-05-10T11:30:00',
    },
    {
      id: 3,
      type: 'MEETING',
      contactName: 'Robert Johnson',
      companyName: 'Tech Solutions',
      description: 'Initial discovery call',
      date: '2023-05-09T15:00:00',
    },
    {
      id: 4,
      type: 'DEMO',
      contactName: 'Sarah Williams',
      companyName: 'Global Systems',
      description: 'Product demonstration',
      date: '2023-05-09T10:00:00',
    },
    {
      id: 5,
      type: 'EMAIL',
      contactName: 'Michael Brown',
      companyName: 'Data Insights',
      description: 'Sent pricing information',
      date: '2023-05-08T16:15:00',
    },
  ];

  // State to store formatted dates
  const [formattedDates, setFormattedDates] = useState<Record<number, string>>({});

  // Format dates on the client side only
  useEffect(() => {
    const dates: Record<number, string> = {};
    activities.forEach(activity => {
      const date = new Date(activity.date);
      dates[activity.id] = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    });
    setFormattedDates(dates);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'EMAIL':
        return (
          <svg
            className="h-5 w-5 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case 'CALL':
        return (
          <svg
            className="h-5 w-5 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        );
      case 'MEETING':
        return (
          <svg
            className="h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case 'DEMO':
        return (
          <svg
            className="h-5 w-5 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your team's most recent interactions with leads.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.contactName} ({activity.companyName})
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {/* Use a placeholder during SSR and the formatted date on client */}
                  {formattedDates[activity.id] || 'Loading...'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity; 