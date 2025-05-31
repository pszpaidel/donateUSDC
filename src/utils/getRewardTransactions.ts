import { Transaction } from 'algosdk/client/indexer';

const REWARD_ADDRESS = 'Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA';

export const getRewardTransactions = (transactions: Transaction[] | undefined) => {
  return transactions.filter((tx) => tx.paymentTransaction && tx.sender === REWARD_ADDRESS);
};
