'use client';

import { useState } from 'react';

interface Activity {
  id: number;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'FOLLOW_UP' | 'DEMO';
  contactName: string;
  companyName: string;
  description: string;
  date: string;
}

const ActivitiesList = () => {
  // This would come from your database in a real application
  const [activities, setActivities] = useState<Activity[]>([
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
    {
      id: 6,
      type: 'FOLLOW_UP',
      contactName: 'Emily Davis',
      companyName: 'Innovative Solutions',
      description: 'Follow-up after meeting',
      date: '2023-05-08T09:30:00',
    },
    {
      id: 7,
      type: 'CALL',
      contactName: 'David Wilson',
      companyName: 'Global Tech',
      description: 'Discussed requirements',
      date: '2023-05-07T14:00:00',
    },
    {
      id: 8,
      type: 'MEETING',
      contactName: 'Lisa Taylor',
      companyName: 'Smart Systems',
      description: 'Presentation to stakeholders',
      date: '2023-05-06T11:00:00',
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'EMAIL':
        return (
          <div className="flex-shrink-0">
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
          </div>
        );
      case 'CALL':
        return (
          <div className="flex-shrink-0">
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
          </div>
        );
      case 'MEETING':
        return (
          <div className="flex-shrink-0">
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
          </div>
        );
      case 'DEMO':
        return (
          <div className="flex-shrink-0">
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
          </div>
        );
      case 'FOLLOW_UP':
        return (
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0">
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
          </div>
        );
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getActivityIcon(activity.type)}
                  <p className="ml-3 text-sm font-medium text-indigo-600 truncate">
                    {activity.type.replace('_', ' ')} with {activity.contactName}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {activity.companyName}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{formatDate(activity.date)}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesList; 