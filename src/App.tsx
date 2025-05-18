import { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';

export const App: FC = () => {
  const handleDonate = useCallback(() => {
    alert('Donate now!');
  }, []);

  const handleWalletConnect = useCallback(() => {
    alert('Wallet connected!');
  }, []);

  return (
    <div>
      <Stack spacing={2}>
        <Button variant="contained" color="primary" onClick={handleWalletConnect}>
          Connect wallet
        </Button>
        <Input placeholder="Add address" />
        <Button variant="contained" color="primary" onClick={handleDonate}>
          Donate now
        </Button>
      </Stack>
    </div>
  );
};
