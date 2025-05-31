import React, { FC, useCallback, useEffect, useState } from 'react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import { Account } from 'algosdk/client/algod';
import numeral from 'numeral';
import CenteredValue from '@/component/CenteredValueComponent.tsx';

interface AccountInfoProps {
  address?: string;
  algorand: AlgorandClient;
}

export const AccountInfo: FC<AccountInfoProps> = ({ address, algorand }) => {
  const [accountInformation, setAccountInformation] = useState<Account>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAccountInfo = useCallback(async () => {
    setIsLoading(true);
    if (address) {
      try {
        const result: Account = await algorand.client.algod.accountInformation(address).do();
        setAccountInformation(result);
      } catch (error) {
        console.error('Failed to fetch account information:', error);
        setAccountInformation(undefined);
      } finally {
        setIsLoading(false);
      }
    } else {
      setAccountInformation(undefined);
      setIsLoading(false);
    }
  }, [address, algorand]);

  useEffect(() => {
    getAccountInfo();
  }, [getAccountInfo, address, algorand]);

  return (
    <CenteredValue
      isLoading={isLoading}
      title="Amount"
      value={
        accountInformation ? numeral(accountInformation?.amount).divide(1000000).format('0') : 'N/A'
      }
    />
  );
};
