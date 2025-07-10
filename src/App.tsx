import React, { useState, useEffect, createContext, useContext } from 'react';
import { Plus, BarChart3, Moon, Sun } from 'lucide-react';
import { Dataset, datasetsApi, CreateDatasetRequest } from './services/api';
import ChartDisplay from './components/ChartDisplay';
import DatasetForm from './components/DatasetForm';
import DatasetList from './components/DatasetList';
import ServerStatus from './components/ServerStatus';

// Dark Mode Context
const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

type View = 'list' | 'create' | 'edit' | 'chart';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [editingDataset, setEditingDataset] = useState<Dataset | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadDatasets();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const clearError = () => {
    setError(null);
  };

  const loadDatasets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await datasetsApi.getAll();
      setDatasets(data);
    } catch (err) {
      setError('Failed to load datasets. Please ensure the server is running.');
      console.error('Error loading datasets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDataset = async (datasetData: CreateDatasetRequest) => {
    try {
      setError(null);
      const newDataset = await datasetsApi.create(datasetData);
      setDatasets(prev => [...prev, newDataset]);
      setSelectedDataset(newDataset);
      setCurrentView('chart');
      showSuccessMessage('Dataset created successfully!');
    } catch (err) {
      setError('Failed to create dataset. Please try again.');
      console.error('Error creating dataset:', err);
    }
  };

  const handleUpdateDataset = async (datasetData: CreateDatasetRequest) => {
    if (!editingDataset) return;

    try {
      setError(null);
      setIsLoading(true);
      const updatedDataset = await datasetsApi.update(editingDataset._id, datasetData);
      setDatasets(prev => prev.map(d => d._id === editingDataset._id ? updatedDataset : d));
      setSelectedDataset(updatedDataset);
      setEditingDataset(null);
      setCurrentView('chart');
      showSuccessMessage('Dataset updated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update dataset. Please try again.';
      setError(errorMessage);
      console.error('Error updating dataset:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDataset = async (id: string) => {
    const dataset = datasets.find(d => d._id === id);
    if (window.confirm(`Are you sure you want to delete "${dataset?.name}"? This action cannot be undone.`)) {
      try {
        setError(null);
        setIsLoading(true);
        await datasetsApi.delete(id);
        setDatasets(prev => prev.filter(d => d._id !== id));
        showSuccessMessage('Dataset deleted successfully!');
        if (selectedDataset?._id === id) {
          setSelectedDataset(null);
          setCurrentView('list');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete dataset. Please try again.';
        setError(errorMessage);
        console.error('Error deleting dataset:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSelectDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setCurrentView('chart');
  };

  const handleEditDataset = (dataset: Dataset) => {
    setEditingDataset(dataset);
    setCurrentView('edit');
  };

  const handleCancelEdit = () => {
    setEditingDataset(null);
    setCurrentView('list');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin dark:border-blue-400"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading datasets...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'create':
        return (
          <DatasetForm
            onSubmit={handleCreateDataset}
            onCancel={() => setCurrentView('list')}
          />
        );

      case 'edit':
        return editingDataset ? (
          <DatasetForm
            onSubmit={handleUpdateDataset}
            onCancel={handleCancelEdit}
            initialData={editingDataset}
            isEditing={true}
          />
        ) : null;

      case 'chart':
        return selectedDataset ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Chart Visualization</h2>
              <button
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 text-blue-600 transition-colors rounded-md dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Back to List
              </button>
            </div>
            <ChartDisplay dataset={selectedDataset} />
          </div>
        ) : null;

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">My Datasets</h2>
              <button
                onClick={() => setCurrentView('create')}
                className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-500 rounded-md shadow-lg dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Create Dataset
              </button>
            </div>
            <DatasetList
              datasets={datasets}
              onSelect={handleSelectDataset}
              onEdit={handleEditDataset}
              onDelete={handleDeleteDataset}
              selectedDataset={selectedDataset ?? undefined}
            />
          </div>
        );
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container px-4 py-8 mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Chart Plotter</h1>
                  <p className="text-gray-600 dark:text-gray-400">Create and visualize your data with interactive charts</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg dark:border-gray-700"
                  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <ServerStatus />
              </div>
            </div>
          </header>

          {/* Messages */}
          {successMessage && (
            <div className="flex items-center justify-between p-4 mb-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <p className="text-green-800 dark:text-green-400">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
              >
                ×
              </button>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-between p-4 mb-6 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-red-800 dark:text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                ×
              </button>
            </div>
          )}

          {/* Main Content */}
          <main>{renderContent()}</main>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
            <p>Built with React, TypeScript, Chart.js, and Express.js</p>
          </footer>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
