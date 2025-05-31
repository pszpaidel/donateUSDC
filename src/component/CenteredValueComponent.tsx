import React from 'react';
import { Spinner } from '@heroui/react';

interface CenteredValueProps {
  title: string;
  value: string | number | null | undefined;
  isLoading?: boolean;
}

export const CenteredValue: React.FC<CenteredValueProps> = ({
  title,
  value,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10 shadow-md w-48 h-48 border-1">
      <h2 className="text-lg font-semibold text-gray-600 mb-2">{title}</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-16">
          <Spinner size="md" color="primary" />
        </div>
      ) : (
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      )}
    </div>
  );
};

export default CenteredValue;
