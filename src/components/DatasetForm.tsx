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
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-200">
        {isEditing ? 'Edit Dataset' : 'Create New Dataset'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Dataset Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter dataset name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter dataset description"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Chart Type
          </label>
          <select
            value={formData.chartType}
            onChange={(e) => setFormData(prev => ({ ...prev, chartType: e.target.value as 'line' | 'bar' | 'scatter' }))}
            className="w-full px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              X-Axis Data (comma-separated)
            </label>
            <textarea
              value={formData.xData.join(', ')}
              onChange={(e) => handleBulkInput('x', e.target.value)}
              className="w-full px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="1, 2, 3, 4, 5"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Y-Axis Data (comma-separated)
            </label>
            <textarea
              value={formData.yData.join(', ')}
              onChange={(e) => handleBulkInput('y', e.target.value)}
              className="w-full px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="10, 20, 15, 25, 30"
              rows={3}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Add Individual Data Points</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={dataInput.x}
              onChange={(e) => setDataInput(prev => ({ ...prev, x: e.target.value }))}
              placeholder="X value"
              className="flex-1 px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <input
              type="number"
              value={dataInput.y}
              onChange={(e) => setDataInput(prev => ({ ...prev, y: e.target.value }))}
              placeholder="Y value"
              className="flex-1 px-3 py-2 text-gray-900 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addDataPoint}
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {formData.xData.length > 0 && (
            <div className="overflow-y-auto max-h-32">
              <div className="space-y-1">
                {formData.xData.map((x, index) => (
                  <div key={index} className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Point {index + 1}: ({x}, {formData.yData[index]})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDataPoint(index)}
                      className="text-red-500 transition-colors dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
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
            className="flex items-center justify-center flex-1 px-4 py-2 text-white transition-colors bg-blue-500 rounded-md shadow-lg dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
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
              className="px-6 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
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