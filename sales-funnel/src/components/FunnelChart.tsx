'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FunnelChartProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

// Mock data for different date ranges
const getMockDataForDateRange = (startDate: Date | null, endDate: Date | null) => {
  // In a real application, this would be an API call with the date range as parameters
  
  // For demo purposes, we'll return different data based on the date range length
  if (!startDate || !endDate) {
    return [100, 75, 50, 30, 15]; // Default data
  }
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) {
    // Daily view - fewer leads, earlier in the funnel
    return [30, 15, 8, 4, 2];
  } else if (diffDays <= 7) {
    // Weekly view
    return [65, 45, 30, 18, 8];
  } else if (diffDays <= 30) {
    // Monthly view
    return [120, 85, 60, 35, 20];
  } else if (diffDays <= 90) {
    // Quarterly view
    return [250, 180, 120, 70, 40];
  } else {
    // Yearly view
    return [500, 350, 220, 120, 70];
  }
};

const FunnelChart = ({ startDate, endDate }: FunnelChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'>>({});

  useEffect(() => {
    // Get data based on the date range
    const funnelData = getMockDataForDateRange(startDate || null, endDate || null);
    
    // Calculate conversion rates between stages
    const conversionRates: string[] = [];
    for (let i = 1; i < funnelData.length; i++) {
      const rate = funnelData[i] / funnelData[i-1] * 100;
      conversionRates.push(rate.toFixed(1) + '%');
    }
    
    setChartData({
      labels: ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed-Won'],
      datasets: [
        {
          label: 'Number of Deals',
          data: funnelData,
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(99, 102, 241, 0.6)',
            'rgba(99, 102, 241, 0.4)',
            'rgba(99, 102, 241, 0.3)',
            'rgba(99, 102, 241, 0.2)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(99, 102, 241)',
            'rgb(99, 102, 241)',
            'rgb(99, 102, 241)',
            'rgb(99, 102, 241)',
          ],
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Sales Funnel',
          padding: {
            top: 10,
            bottom: 20
          },
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const dataIndex = context.dataIndex;
              if (dataIndex < conversionRates.length) {
                return `Conversion rate: ${conversionRates[dataIndex]}`;
              }
              return '';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Deals',
          },
        },
      },
    });
  }, [startDate, endDate]);

  return (
    <div className="relative w-full h-[400px]">
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar options={chartOptions} data={chartData} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      )}
    </div>
  );
};

export default FunnelChart; 