import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Dataset } from '../services/api';
import { useDarkMode } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  dataset: Dataset;
  className?: string;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ dataset, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  const chartData = {
    labels: dataset.xData.map(x => x.toString()),
    datasets: [
      {
        label: dataset.name,
        data: dataset.yData,
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.1)',
        borderColor: isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: isDarkMode ? 'rgba(168, 85, 247, 1)' : 'rgba(139, 92, 246, 1)',
        pointBorderColor: isDarkMode ? 'rgba(168, 85, 247, 1)' : 'rgba(139, 92, 246, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: dataset.name,
        data: dataset.xData.map((x, index) => ({ x, y: dataset.yData[index] })),
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.7)' : 'rgba(59, 130, 246, 0.6)',
        borderColor: isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
      title: {
        display: true,
        text: dataset.name,
        font: {
          size: 16,
          family: 'Inter, sans-serif',
          weight: 'bold',
        },
        color: isDarkMode ? '#f3f4f6' : '#111827',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'X-Axis',
          font: {
            size: 14,
            family: 'Inter, sans-serif',
          },
          color: isDarkMode ? '#d1d5db' : '#374151',
        },
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Y-Axis',
          font: {
            size: 14,
            family: 'Inter, sans-serif',
          },
          color: isDarkMode ? '#d1d5db' : '#374151',
        },
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  const renderChart = () => {
    switch (dataset.chartType) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'scatter':
        return <Scatter data={scatterData} options={options} />;
      default:
        return <Line data={chartData} options={options} />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-6 ${className}`}>
      <div className="h-96">
        {renderChart()}
      </div>
      {dataset.description && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{dataset.description}</p>
      )}
    </div>
  );
};

export default ChartDisplay;