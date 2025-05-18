import { FC, useMemo } from 'react';
import Button from '@mui/material/Button';

export const App: FC = () => {
  const handleDonate = useMemo(() => {
    return () => {
      alert('Donate now!');
    };
  }, []);

  return (
    <div>
      <h1>Donate USDC</h1>
      <p>Welcome to the USDC donation application!</p>
      <Button variant="contained" color="primary" onClick={handleDonate}>
        Donate now
      </Button>
    </div>
  );
};