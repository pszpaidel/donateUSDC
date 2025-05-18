import { FC, useCallback } from 'react';
import Button from '@mui/material/Button';

export const App: FC = () => {

  const handleDonate = useCallback(() => {
    alert('Donate now!');
  }, []);

  return (
    <div>
      <h1>Donate USDC</h1>
      <Button variant="contained" color="primary" onClick={handleDonate}>
        Donate now
      </Button>
    </div>
  );
};
