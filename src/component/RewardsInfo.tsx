import { FC, useCallback, useEffect, useState } from 'react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import numeral, { Numeral } from 'numeral';
import CenteredValue from '@/component/CenteredValueComponent.tsx';
import { Transaction } from 'algosdk/client/indexer';

interface RewardsInfoProps {
  address?: string;
  algorand: AlgorandClient;
}

const REWARD_ADDRESS = 'Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA';

const getRewardTransactions = (transactions: Transaction[] | undefined) => {
  return transactions.filter((tx) => tx.paymentTransaction && tx.sender === REWARD_ADDRESS);
};

export const RewardsInfo: FC<RewardsInfoProps> = ({ address, algorand }) => {
  const [rewards, setRewards] = useState<Numeral[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getStakingRewards = useCallback(async () => {
    setIsLoading(true);
    if (address) {
      try {
        const transactionsResponse = await algorand.client.indexer
          .searchForTransactions()
          .address(address)
          .txType('pay')
          .do();
        const fetchedRewards = getRewardTransactions(transactionsResponse.transactions);

        const amountOfRewards = fetchedRewards.map((value) =>
          numeral(value?.paymentTransaction.amount || numeral(0)),
        );

        setRewards(amountOfRewards);
      } catch (error) {
        console.error('Failed to fetch rewards information:', error);
        setRewards([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setRewards([]);
      setIsLoading(false);
    }
  }, [address, algorand]);

  useEffect(() => {
    getStakingRewards();
  }, [getStakingRewards, address, algorand]);

  const totalRewards = rewards.reduce((sum, current) => sum.add(current.value()), numeral(0));

  return (
    <CenteredValue
      isLoading={isLoading}
      title="Rewards"
      value={isLoading ? 'Loading...' : totalRewards.divide(1000000).format('0.0')}
    />
  );
};
