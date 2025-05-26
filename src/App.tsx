import { FC, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
// import { WalletManager, WalletId, NetworkId, WalletProvider } from '@txnlab/use-wallet-react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import { Box } from '@mui/material';
import numeral, { Numeral } from 'numeral';
import { Account, NodeStatusResponse } from 'algosdk/dist/types/client/v2/algod/models/types';

const REWARD_ADDRESS = 'Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA';

// const manager = new WalletManager({
//   wallets: [WalletId.PERA],
//   defaultNetwork: NetworkId.MAINNET,
// });

const algorand = AlgorandClient.mainNet();
const algodClient = algorand.client.algod;
const indexerClient = algorand.client.indexer;

export const App: FC = () => {
  const [address, setAddress] = useState<string>(
    'RULTY7ANRKPCOOVMV4DYNVFUZ2APHSTMY4JDPMS3ZIOCQS6EQOS3DEUTVY',
  );

  const [accountInformation, setAccountInformation] = useState<Account | null>(null);
  const [status, setStatus] = useState<NodeStatusResponse | null>(null);
  const [allTransactionsReward, setAllTransactionsReward] = useState<Numeral[]>([]);

  const getAccountInfo = useCallback(async () => {
    const result = await algodClient.accountInformation(address).do();
    console.log(result);

    setAccountInformation(result);
  }, [address]);

  const getStatus = useCallback(async () => {
    const result = await algodClient.status().do();
    console.log(result);

    setStatus(result);
  }, []);

  const getStakingRewards = useCallback(async () => {
    const txns = await indexerClient.searchForTransactions().address(address).txType('pay').do();

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
    await getStatus();
    await getStakingRewards();
  }, []);

  return (
    <div>
      <Stack spacing={2}>
        <Input
          placeholder="Add address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" onClick={getInfo}>
          Check Account
        </Button>
        <Box
          visibility={accountInformation ? 'visible' : 'hidden'}
          component="section"
          sx={{ p: 2, border: '1px dashed grey' }}
        >
          <div>Address: {accountInformation?.address}</div>
          <div>Amount: {numeral(accountInformation?.amount).divide(1000000).format('0')}</div>
          <div>Current Round: {numeral(status?.lastRound).format('0')}</div>
          <div>
            Rewards:
            {allTransactionsReward
              .reduce((sum, current) => sum.add(current.value()), numeral(0))
              .divide(1000000)
              .format('0.0')}
          </div>
        </Box>
      </Stack>
    </div>
  );
};
