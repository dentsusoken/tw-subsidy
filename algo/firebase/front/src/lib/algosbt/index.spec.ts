import { expect } from 'chai';

import {
  decryptByPassword,
  decryptBySecretKey,
  encryptByPassword,
} from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { addressFromDid } from './utils/didUtils';
import { testNetAlgod as algod } from './algod/algods';
import { testNetAlgoIndexer as indexer } from './indexer/indexers';
import deleteApp from './transactions/deleteApp';
import destoryAsset from './transactions/destroyAsset';
import setRevoked from './transactions/setRevoked';
import loadMessage from './transactions/loadMessage';
import { holderAccount, issuerAccount } from '../algo/account/accounts';

import {
  createDidAccount,
  restoreDidAccount,
  createVCRequest,
  verifyVCRequest,
  createVC,
  verifyVC,
  saveVC,
  loadVC,
  revokeVC,
} from '.';
import { decodeObj } from 'algosdk';

describe('algosbt', () => {
  it('createDidAccount should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);

    expect(didAccount.did).to.not.be.empty;
    expect(didAccount.encSecretKey).to.not.be.empty;

    const secretKey = decryptByPassword(didAccount.encSecretKey, password);

    expect(addressFromSecretKey(secretKey)).to.eq(
      addressFromDid(didAccount.did)
    );
  });

  it('restoreDidAccount should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);

    expect(didAccount.did).to.not.be.empty;
    expect(didAccount.encSecretKey).to.not.be.empty;

    expect(restoreDidAccount(didAccount.encSecretKey, password)).to.eql(
      didAccount
    );
  });

  it('createVCRequest should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);
    const message = {
      name: 'Yasuo',
    };

    const req = createVCRequest(didAccount, message, password);

    expect(req.holderDid).to.eq(didAccount.did);
    expect(req.message).to.eql(message);
    expect(req.signature).to.not.be.empty;
  });

  it('verifyVCRequest should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);
    const message = {
      name: 'Yasuo',
    };

    const req = createVCRequest(didAccount, message, password);

    expect(verifyVCRequest(req)).to.be.true;
  });

  it('createVC should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVC(
      algod,
      issuerDidAccount,
      { holderDid, content },
      issuerPassword
    );
    const appIndex = vc.message.appIndex;
    console.log('Application Index:', appIndex);

    await deleteApp(
      algod,
      {
        from: addressFromDid(issuerDidAccount.did),
        appIndex,
      },
      issuerSecretKey
    );

    expect(vc.issuerDid).to.eq(issuerDidAccount.did);
    expect(vc.message.holderDid).to.eq(holderDidAccount.did);
    expect(vc.message.content).to.eql(content);
    expect(vc.signature).to.not.be.empty;
  });

  it('verifyVC should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVC(
      algod,
      issuerDidAccount,
      { holderDid, content },
      issuerPassword
    );
    const from = addressFromDid(issuerDidAccount.did);
    const appIndex = vc.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      expect(await verifyVC(algod, vc)).to.be.true;

      await setRevoked(algod, { from, appIndex, value: 1 }, issuerSecretKey);

      expect(await verifyVC(algod, vc)).to.be.false;
    } finally {
      await deleteApp(
        algod,
        {
          from,
          appIndex,
        },
        issuerSecretKey
      );
    }
  });

  it('revokeVC should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVC(
      algod,
      issuerDidAccount,
      { holderDid, content },
      issuerPassword
    );

    const appIndex = vc.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      expect(await verifyVC(algod, vc)).to.be.true;

      await revokeVC(algod, issuerDidAccount, vc, issuerPassword);

      expect(await verifyVC(algod, vc)).to.be.false;
    } finally {
      await deleteApp(
        algod,
        {
          from: issuerAccount.addr,
          appIndex,
        },
        issuerSecretKey
      );
    }
  });

  it('saveVC should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVC(
      algod,
      issuerDidAccount,
      { holderDid, content },
      issuerPassword
    );
    const appIndex = vc.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const assetIndex = await saveVC(
        algod,
        holderDidAccount,
        { vc, assetName: 'test' },
        holderPassword
      );
      console.log('Asset Index:', assetIndex);

      try {
        const encryptSbt = await loadMessage(indexer, assetIndex);
        const encodedSbt = decryptBySecretKey(encryptSbt, holderSecretKey);

        expect(decodeObj(encodedSbt)).to.eql(vc);
      } finally {
        await destoryAsset(
          algod,
          { from: holderAccount.addr, assetIndex },
          holderSecretKey
        );
      }
    } finally {
      await deleteApp(
        algod,
        { from: issuerAccount.addr, appIndex },
        issuerSecretKey
      );
    }
  });

  it('loadVC should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVC(
      algod,
      issuerDidAccount,
      { holderDid, content },
      issuerPassword
    );
    const appIndex = vc.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const assetIndex = await saveVC(
        algod,
        holderDidAccount,
        { vc, assetName: 'test' },
        holderPassword
      );
      console.log('Asset Index:', assetIndex);

      try {
        expect(
          await loadVC(indexer, holderDidAccount, assetIndex, holderPassword)
        ).to.eql(vc);
      } finally {
        await destoryAsset(
          algod,
          { from: holderAccount.addr, assetIndex },
          holderSecretKey
        );
      }
    } finally {
      await deleteApp(
        algod,
        { from: issuerAccount.addr, appIndex },
        issuerSecretKey
      );
    }
  });
});
