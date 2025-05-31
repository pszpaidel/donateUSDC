import React from 'react';
import { Spinner } from '@heroui/react';

interface CenteredValueProps {
  title: string;
  value: string | number;
}

export const CenteredValue: React.FC<CenteredValueProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-10 shadow-md w-48 h-48 border-1">
      <h2 className="text-lg font-semiboldtext-gray-600 mb-2">{title}</h2>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <Spinner size="md" color="success" />
    </div>
  );
};

export default CenteredValue;
