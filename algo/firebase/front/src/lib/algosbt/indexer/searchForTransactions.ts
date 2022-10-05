import algosdk from 'algosdk';

const searchForTransactions = (
  indexer: algosdk.Indexer,
  assetIndex: number
) => {
  return indexer.searchForTransactions().assetID(assetIndex).do();
};

export default searchForTransactions;
