import React, { FC, useCallback, useState } from 'react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import numeral, { Numeral } from 'numeral';
import { Button, Input } from '@heroui/react';
import { Account } from 'algosdk/client/algod';
import { fetchTransactions } from '@/utils/fetchTransactions.ts';
import { getRewardTransactions } from '@/utils/getRewardTransactions.ts';
import CenteredValue from '@/component/CenteredValueComponent.tsx';

const algorand = AlgorandClient.mainNet();

export const App: FC = () => {
  const [address, setAddress] = useState<string>();

  const [accountInformation, setAccountInformation] = useState<Account>();
  const [allTransactionsReward, setAllTransactionsReward] = useState<Numeral[]>([]);

  const getAccountInfo = useCallback(async () => {
    const result: Account = await algorand.client.algod.accountInformation(address).do();
    setAccountInformation(result);
  }, [address]);

  const getStakingRewards = useCallback(async () => {
    const transactionsResponse = await fetchTransactions(algorand.client.indexer, address);
    const rewards = getRewardTransactions(transactionsResponse.transactions);

    const amountOfRewards = rewards.map((value) =>
      numeral(value?.paymentTransaction.amount || numeral(0)),
    );

    console.log(transactionsResponse);

    setAllTransactionsReward(amountOfRewards);
  }, [address]);

  const getInfo = useCallback(async (): Promise<void> => {
    await getAccountInfo();
    await getStakingRewards();
  }, [getAccountInfo, getStakingRewards]);

  return (
    <div>
      <Input
        value={address || 'RULTY7ANRKPCOOVMV4DYNVFUZ2APHSTMY4JDPMS3ZIOCQS6EQOS3DEUTVY'}
        placeholder="Add address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Button onPress={getInfo}>Check Account</Button>

      <CenteredValue
        title="Rewards"
        isLoading={!allTransactionsReward.length}
        value={allTransactionsReward
          .reduce((sum, current) => sum.add(current.value()), numeral(0))
          .divide(1000000)
          .format('0.0')}
      />

      <CenteredValue
        isLoading={!accountInformation}
        title="Amount"
        value={numeral(accountInformation?.amount).divide(1000000).format('0')}
      />
    </div>
  );
};
