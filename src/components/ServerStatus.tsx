import React, { useState, useEffect } from 'react';
import { Server, AlertCircle, CheckCircle } from 'lucide-react';
import { datasetsApi } from '../services/api';
import { useDarkMode } from '../App';

const ServerStatus: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const status = await datasetsApi.health();
      setIsConnected(status);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); 
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    if (isChecking) {
      return <Server className="w-4 h-4 text-gray-500 animate-spin dark:text-gray-400" />;
    }
    if (isConnected === true) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (isConnected === false) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return <Server className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    if (isConnected === true) return 'Connected';
    if (isConnected === false) return 'Disconnected';
    return 'Unknown';
  };

  const getStatusColor = () => {
    if (isConnected === true) return 'text-green-600 dark:text-green-400';
    if (isConnected === false) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {getStatusIcon()}
      <span className={`text-sm font-medium ${getStatusColor()}`}>
        Server: {getStatusText()}
      </span>
      {isConnected === false && (
        <button
          onClick={checkConnection}
          className="px-2 py-1 ml-2 text-xs text-white transition-colors bg-blue-500 rounded dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ServerStatus;