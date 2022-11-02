import algosdk, { Algodv2 } from 'algosdk';

const getAlgoBlance = async (algod: Algodv2, address: string) => {
  const accountInfo = await algod
    .accountInformation(address)
    .setIntDecoding(algosdk.IntDecoding.BIGINT)
    .do();

  return accountInfo.amount as bigint;
};

export default getAlgoBlance;
