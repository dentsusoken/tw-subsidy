import { expect } from 'chai';

import {
  decryptByPassword,
  decryptBySecretKey,
  encryptByPassword,
} from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { testNetAlgod as algod } from './algod/algods';
import { testNetAlgoIndexer as indexer } from './indexer/indexers';
import { test1Account, test2Account } from './account/accounts';
import deleteApp from './transactions/deleteApp';
import destoryAsset from './transactions/destroyAsset';
import setRevoked from './transactions/setRevoked';
import loadMessage from './transactions/loadMessage';

import {
  createEncAccount,
  restoreEncAccount,
  createSBTRequest,
  verifySBTRequest,
  createSBT,
  verifySBT,
  saveSBT,
  loadSBT,
} from '.';
import { decodeObj } from 'algosdk';

describe('algosbt', () => {
  it('createEncAccount should work', () => {
    const password = 'abcdefgh';
    const encAccount = createEncAccount(password);

    expect(encAccount.address).to.not.be.empty;
    expect(encAccount.encSecretKey).to.not.be.empty;

    const secretKey = decryptByPassword(encAccount.encSecretKey, password);

    expect(addressFromSecretKey(secretKey)).to.eq(encAccount.address);
  });

  it('restoreEncAccount should work', () => {
    const password = 'abcdefgh';
    const encAccount = createEncAccount(password);

    expect(encAccount.address).to.not.be.empty;
    expect(encAccount.encSecretKey).to.not.be.empty;

    expect(restoreEncAccount(encAccount.encSecretKey, password)).to.eql(
      encAccount
    );
  });

  it('createSBTRequest should work', () => {
    const password = 'abcdefgh';
    const encAccount = createEncAccount(password);
    const secretKey = decryptByPassword(encAccount.encSecretKey, password);
    const message = {
      name: 'Yasuo',
    };

    const req = createSBTRequest(encAccount.address, message, secretKey);

    expect(req.holderAddress).to.eq(encAccount.address);
    expect(req.message).to.eql(message);
    expect(req.signature).to.not.be.empty;
  });

  it('verifySBTRequest should work', () => {
    const password = 'abcdefgh';
    const encAccount = createEncAccount(password);
    const secretKey = decryptByPassword(encAccount.encSecretKey, password);
    const message = {
      name: 'Yasuo',
    };

    const req = createSBTRequest(encAccount.address, message, secretKey);

    expect(verifySBTRequest(req)).to.be.true;
  });

  it('createSBT should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderEncAccount = createEncAccount(holderPassword);

    const issuerEncSecretKey = encryptByPassword(
      test1Account.sk,
      issuerPassword
    );
    const issuerEncAccount = restoreEncAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const secretKey = test1Account.sk;

    const issuerAddress = issuerEncAccount.address;
    const holderAddress = holderEncAccount.address;
    const content = {
      name: 'Yasuo',
    };

    const sbt = await createSBT(
      algod,
      { issuerAddress, holderAddress, content },
      secretKey
    );
    await deleteApp(
      algod,
      { from: issuerAddress, appIndex: sbt.message.appIndex },
      secretKey
    );

    expect(sbt.issuerAddress).to.eq(issuerEncAccount.address);
    expect(sbt.message.holderAddress).to.eq(holderEncAccount.address);
    expect(sbt.message.content).to.eql(content);
    expect(sbt.signature).to.not.be.empty;
  });

  it('verifySBT should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderEncAccount = createEncAccount(holderPassword);
    const issuerEncSecretKey = encryptByPassword(
      test1Account.sk,
      issuerPassword
    );
    const issuerEncAccount = restoreEncAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const secretKey = test1Account.sk;
    const issuerAddress = issuerEncAccount.address;
    const holderAddress = holderEncAccount.address;
    const content = {
      name: 'Yasuo',
    };

    const sbt = await createSBT(
      algod,
      { issuerAddress, holderAddress, content },
      secretKey
    );

    try {
      expect(await verifySBT(algod, sbt)).to.be.true;

      await setRevoked(
        algod,
        { from: issuerAddress, appIndex: sbt.message.appIndex, value: 1 },
        secretKey
      );

      expect(await verifySBT(algod, sbt)).to.be.false;
    } finally {
      await deleteApp(
        algod,
        { from: issuerAddress, appIndex: sbt.message.appIndex },
        secretKey
      );
    }
  });

  it('saveSBT should work', async () => {
    const issuerAddress = test1Account.addr;
    const holderAddress = test2Account.addr;

    const issuerSecretKey = test1Account.sk;
    const holderSecretKey = test2Account.sk;

    const content = {
      name: 'Yasuo',
    };

    const sbt = await createSBT(
      algod,
      { issuerAddress, holderAddress, content },
      issuerSecretKey
    );
    const appIndex = sbt.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const assetIndex = await saveSBT(
        algod,
        { sbt, assetName: 'test' },
        holderSecretKey
      );
      console.log('Asset Index:', assetIndex);

      try {
        const encryptSbt = await loadMessage(indexer, assetIndex);
        const encodedSbt = decryptBySecretKey(encryptSbt, holderSecretKey);

        expect(decodeObj(encodedSbt)).to.eql(sbt);
      } finally {
        await destoryAsset(
          algod,
          { from: holderAddress, assetIndex },
          holderSecretKey
        );
      }
    } finally {
      await deleteApp(
        algod,
        { from: issuerAddress, appIndex },
        issuerSecretKey
      );
    }
  });

  it('loadSBT should work', async () => {
    const issuerAddress = test1Account.addr;
    const holderAddress = test2Account.addr;

    const issuerSecretKey = test1Account.sk;
    const holderSecretKey = test2Account.sk;

    const content = {
      name: 'Yasuo',
    };

    const sbt = await createSBT(
      algod,
      { issuerAddress, holderAddress, content },
      issuerSecretKey
    );
    const appIndex = sbt.message.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const assetIndex = await saveSBT(
        algod,
        { sbt, assetName: 'test' },
        holderSecretKey
      );
      console.log('Asset Index:', assetIndex);

      try {
        expect(await loadSBT(indexer, assetIndex, holderSecretKey)).to.eql(sbt);
      } finally {
        await destoryAsset(
          algod,
          { from: holderAddress, assetIndex },
          holderSecretKey
        );
      }
    } finally {
      await deleteApp(
        algod,
        { from: issuerAddress, appIndex },
        issuerSecretKey
      );
    }
  });
});
