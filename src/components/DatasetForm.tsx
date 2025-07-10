import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { CreateDatasetRequest } from '../services/api';
import { useDarkMode } from '../App';

interface DatasetFormProps {
  onSubmit: (dataset: CreateDatasetRequest) => void;
  onCancel?: () => void;
  initialData?: Partial<CreateDatasetRequest>;
  isEditing?: boolean;
}

const DatasetForm: React.FC<DatasetFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData,
  isEditing = false 
}) => {
  const { isDarkMode } = useDarkMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateDatasetRequest>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    xData: initialData?.xData || [],
    yData: initialData?.yData || [],
    chartType: initialData?.chartType || 'line',
  });

  const [dataInput, setDataInput] = useState({
    x: '',
    y: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.xData.length > 0 && formData.yData.length > 0) {
      setIsSubmitting(true);
      onSubmit(formData);
      // Reset submitting state after a delay to prevent double submissions
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const addDataPoint = () => {
    const x = parseFloat(dataInput.x);
    const y = parseFloat(dataInput.y);
    
    if (!isNaN(x) && !isNaN(y)) {
      setFormData(prev => ({
        ...prev,
        xData: [...prev.xData, x],
        yData: [...prev.yData, y],
      }));
      setDataInput({ x: '', y: '' });
    }
  };

  const removeDataPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      xData: prev.xData.filter((_, i) => i !== index),
      yData: prev.yData.filter((_, i) => i !== index),
    }));
  };

  const handleBulkInput = (type: 'x' | 'y', value: string) => {
    const numbers = value.split(',').map(str => parseFloat(str.trim())).filter(num => !isNaN(num));
    setFormData(prev => ({
      ...prev,
      [type + 'Data']: numbers,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {isEditing ? 'Edit Dataset' : 'Create New Dataset'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dataset Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            placeholder="Enter dataset name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            placeholder="Enter dataset description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chart Type
          </label>
          <select
            value={formData.chartType}
            onChange={(e) => setFormData(prev => ({ ...prev, chartType: e.target.value as 'line' | 'bar' | 'scatter' }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              X-Axis Data (comma-separated)
            </label>
            <textarea
              value={formData.xData.join(', ')}
              onChange={(e) => handleBulkInput('x', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              placeholder="1, 2, 3, 4, 5"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Y-Axis Data (comma-separated)
            </label>
            <textarea
              value={formData.yData.join(', ')}
              onChange={(e) => handleBulkInput('y', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              placeholder="10, 20, 15, 25, 30"
              rows={3}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add Individual Data Points</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={dataInput.x}
              onChange={(e) => setDataInput(prev => ({ ...prev, x: e.target.value }))}
              placeholder="X value"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            />
            <input
              type="number"
              value={dataInput.y}
              onChange={(e) => setDataInput(prev => ({ ...prev, y: e.target.value }))}
              placeholder="Y value"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            />
            <button
              type="button"
              onClick={addDataPoint}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {formData.xData.length > 0 && (
            <div className="max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {formData.xData.map((x, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Point {index + 1}: ({x}, {formData.yData[index]})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDataPoint(index)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!formData.name || formData.xData.length === 0 || formData.yData.length === 0 || isSubmitting}
            className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Dataset' : 'Create Dataset'
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DatasetForm;