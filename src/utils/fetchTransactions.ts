import algosdk from 'algosdk';

export async function fetchTransactions(indexer: algosdk.Indexer, address: string) {
  try {
    return await indexer.searchForTransactions().address(address).txType('pay').do();
  } catch (error) {
    console.error('Error fetching payment transactions:', error);
    throw error;
  }
}
