import React from 'react';
import { TriangleAlert, WifiOff } from 'lucide-react';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-950 rounded-lg shadow-md text-red-800 dark:text-red-200">
      {message.includes("Network Error") || message.includes("ECONNREFUSED") ? (
        <WifiOff size={48} className="mb-4 text-red-600 dark:text-red-400" />
      ) : (
        <TriangleAlert size={48} className="mb-4 text-red-600 dark:text-red-400" />
      )}
      <h3 className="text-xl font-semibold mb-2">Error Occurred!</h3>
      <p className="text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
