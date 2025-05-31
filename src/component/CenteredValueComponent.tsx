import React from 'react';
import { Spinner } from '@heroui/react';

interface CenteredValueProps {
  title: string;
  value: string | number | null | undefined;
  isLoading?: boolean;
}

const ValueDisplay: React.FC<{ value: string | number | null | undefined }> = ({ value }) => (
  <p className="text-3xl font-bold text-black">{value}</p>
);

const LoadingDisplay: React.FC = () => (
  <div className="flex items-center justify-center h-14">
    <Spinner size="lg" color="default" />
  </div>
);

export const CenteredValue: React.FC<CenteredValueProps> = ({
  title,
  value,
  isLoading = false,
}) => (
  <div className="flex flex-col items-center justify-center bg-white p-7 w-40 h-40 rounded border border-gray-300 shadow-md shadow-gray-300">
    <h2 className="text-lg font-semibold text-black mb-1 tracking-normal">{title}</h2>
    {isLoading ? <LoadingDisplay /> : <ValueDisplay value={value} />}
  </div>
);

export default CenteredValue;
