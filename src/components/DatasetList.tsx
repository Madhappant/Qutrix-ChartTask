import React from 'react';
import { Edit2, Trash2, BarChart3, Eye } from 'lucide-react';
import { Dataset } from '../services/api';
import { useDarkMode } from '../App';

interface DatasetListProps {
  datasets: Dataset[];
  onSelect: (dataset: Dataset) => void;
  onEdit: (dataset: Dataset) => void;
  onDelete: (id: string) => void;
  selectedDataset?: Dataset;
}

const DatasetList: React.FC<DatasetListProps> = ({
  datasets,
  onSelect,
  onEdit,
  onDelete,
  selectedDataset,
}) => {
  const { isDarkMode } = useDarkMode();

  const getChartTypeColor = (type: string) => {
    switch (type) {
      case 'line':
        return isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800';
      case 'bar':
        return isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'scatter':
        return isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800';
      default:
        return isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (datasets.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">No datasets found</h3>
        <p className="text-gray-500 dark:text-gray-400">Create your first dataset to get started with chart plotting.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {datasets.map((dataset) => (
        <div
          key={dataset._id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${
            selectedDataset?._id === dataset._id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{dataset.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getChartTypeColor(dataset.chartType)}`}>
                  {dataset.chartType}
                </span>
              </div>
              
              {dataset.description && (
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{dataset.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{dataset.xData.length} data points</span>
                <span>Created: {formatDate(dataset.createdAt)}</span>
                {dataset.updatedAt !== dataset.createdAt && (
                  <span>Updated: {formatDate(dataset.updatedAt)}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(dataset);
                }}
                className="p-2 text-gray-500 transition-colors rounded-md dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                title="View chart"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(dataset);
                }}
                className="p-2 text-gray-500 transition-colors rounded-md dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                title="Edit dataset"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(dataset._id);
                }}
                className="p-2 text-gray-500 transition-colors rounded-md dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 group"
                title="Delete dataset"
              >
                <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatasetList;