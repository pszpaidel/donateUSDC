import React from 'react';
import { FC, useCallback, useState } from 'react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import numeral, { Numeral } from 'numeral';
import { Button, Input } from '@heroui/react';

const REWARD_ADDRESS = 'Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA';

const algorand = AlgorandClient.mainNet();

export const App: FC = () => {
  const [address, setAddress] = useState<string>(
    'RULTY7ANRKPCOOVMV4DYNVFUZ2APHSTMY4JDPMS3ZIOCQS6EQOS3DEUTVY',
  );

  const [accountInformation, setAccountInformation] = useState();
  const [allTransactionsReward, setAllTransactionsReward] = useState<Numeral[]>([]);

  const getAccountInfo = useCallback(async () => {
    const result = await algorand.client.algod.accountInformation(address).do();
    console.log(result);

    setAccountInformation(result);
  }, [address]);

  const getStakingRewards = useCallback(async () => {
    const txns = await algorand.client.indexer
      .searchForTransactions()
      .address(address)
      .txType('pay')
      .do();

    console.log(txns);

    const rewardTxns = txns.transactions.filter(
      (tx) => tx.paymentTransaction && tx.sender === REWARD_ADDRESS,
    );

    const allTransactionsReward = rewardTxns.map((value) =>
      numeral(value?.paymentTransaction?.amount || numeral(0)),
    );

    setAllTransactionsReward(allTransactionsReward);
  }, [address]);

  const getInfo = useCallback(async (): Promise<void> => {
    await getAccountInfo();
    await getStakingRewards();
  }, []);

  return (
    <div>
      <Input
        value={address}
        placeholder="Add address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Button onPress={getInfo}>Check Account</Button>

      <div>Address: {accountInformation?.address}</div>
      <div>Amount: {numeral(accountInformation?.amount).divide(1000000).format('0')}</div>
      <div>
        Rewards:
        {allTransactionsReward
          .reduce((sum, current) => sum.add(current.value()), numeral(0))
          .divide(1000000)
          .format('0.0')}
      </div>
    </div>
  );
};
