// import 'dotenv/config';

import algosdk from 'algosdk';
import * as cryptUtils from '@/lib/algosbt/utils/cryptUtils';
import { restoreDidAccount } from '@/lib/algosbt';

const holderMnemonic =
  'belt dawn soap disease sauce canal crush trend debris alone ghost document action lonely fork shuffle inch uphold car naive viable harsh search abstract salmon';
const issuerMnemonic =
  'wrong number drum zone seek elephant isolate turkey brisk hidden degree caution hotel ski potato soldier rule invest april pill mystery night today absent tenant';
const verifierMnemonic =
  'analyst tribe ask drum ladder copy genre juice rate cry accuse promote oil address rotate pumpkin crazy adapt melody betray vague tongue place absent need';

export const holderPw = '12345678';
export const issuerPw = '23456789';
export const verifierPw = '34567812';

export const holderAccount = algosdk.mnemonicToSecretKey(holderMnemonic);
export const issuerAccount = algosdk.mnemonicToSecretKey(issuerMnemonic);
export const verifierAccount = algosdk.mnemonicToSecretKey(verifierMnemonic);

export const holderEncSk = cryptUtils.encryptByPassword(
  holderAccount.sk,
  holderPw
);
export const issuerEncSk = cryptUtils.encryptByPassword(
  issuerAccount.sk,
  issuerPw
);
export const verifierEncSk = cryptUtils.encryptByPassword(
  verifierAccount.sk,
  verifierPw
);

export const holderDidAccount = restoreDidAccount(holderEncSk, holderPw);
export const issuerDidAccount = restoreDidAccount(issuerEncSk, issuerPw);
export const verifierDidAccount = restoreDidAccount(verifierEncSk, verifierPw);

const main = async () => {
  console.log('Holder:', holderAccount.addr);
  console.log('Issuer:', issuerAccount.addr);
  console.log('Verifier:', verifierAccount.addr);
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit(0);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
