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

const FunnelChart = () => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'>>({});

  useEffect(() => {
    // In a real application, this data would come from the database
    setChartData({
      labels: ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed-Won'],
      datasets: [
        {
          label: 'Number of Deals',
          data: [100, 75, 50, 30, 15],
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
  }, []);

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