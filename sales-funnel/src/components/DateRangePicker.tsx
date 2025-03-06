'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker = ({ onDateRangeChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      onDateRangeChange(start, end);
    }
  };

  const applyPreset = (preset: string) => {
    let newStartDate: Date | null = null;
    let newEndDate: Date | null = new Date();
    
    switch (preset) {
      case 'today':
        newStartDate = new Date();
        break;
      case 'yesterday':
        newStartDate = subDays(new Date(), 1);
        newEndDate = subDays(new Date(), 1);
        break;
      case 'last7days':
        newStartDate = subDays(new Date(), 6);
        break;
      case 'last30days':
        newStartDate = subDays(new Date(), 29);
        break;
      case 'thisWeek':
        newStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        newEndDate = endOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case 'lastWeek':
        newStartDate = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
        newEndDate = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
        break;
      case 'thisMonth':
        newStartDate = startOfMonth(new Date());
        newEndDate = endOfMonth(new Date());
        break;
      case 'lastMonth':
        newStartDate = startOfMonth(subMonths(new Date(), 1));
        newEndDate = endOfMonth(subMonths(new Date(), 1));
        break;
      case 'thisQuarter':
        newStartDate = startOfQuarter(new Date());
        newEndDate = endOfQuarter(new Date());
        break;
      case 'lastQuarter':
        newStartDate = startOfQuarter(subMonths(new Date(), 3));
        newEndDate = endOfQuarter(subMonths(new Date(), 3));
        break;
      case 'thisYear':
        newStartDate = startOfYear(new Date());
        newEndDate = endOfYear(new Date());
        break;
      case 'lastYear':
        newStartDate = startOfYear(subMonths(new Date(), 12));
        newEndDate = endOfYear(subMonths(new Date(), 12));
        break;
      default:
        break;
    }
    
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    
    if (newStartDate && newEndDate) {
      onDateRangeChange(newStartDate, newEndDate);
    }
    
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
        return format(startDate, 'MMM d, yyyy');
      }
      return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    return 'Select date range';
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDateRange()}
          </button>
          
          {isOpen && (
            <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => applyPreset('today')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Today
                </button>
                <button
                  onClick={() => applyPreset('yesterday')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => applyPreset('last7days')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => applyPreset('last30days')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => applyPreset('thisWeek')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  This Week
                </button>
                <button
                  onClick={() => applyPreset('lastWeek')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last Week
                </button>
                <button
                  onClick={() => applyPreset('thisMonth')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  This Month
                </button>
                <button
                  onClick={() => applyPreset('lastMonth')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last Month
                </button>
                <button
                  onClick={() => applyPreset('thisQuarter')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  This Quarter
                </button>
                <button
                  onClick={() => applyPreset('lastQuarter')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last Quarter
                </button>
                <button
                  onClick={() => applyPreset('thisYear')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  This Year
                </button>
                <button
                  onClick={() => applyPreset('lastYear')}
                  className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Last Year
                </button>
              </div>
              
              <div className="mt-2">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker; 