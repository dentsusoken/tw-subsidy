import { expect } from 'chai';

import { decryptByPassword, encryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { testNetAlgod as algod } from './algod/algods';
import { test1Account } from './account/accounts';

import {
  createEncAccount,
  restoreEncAccount,
  createSBTRequest,
  verifySBTRequest,
  createSBT,
  verifySBT,
} from '.';
import deleteApp from './transactions/deleteApp';

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
    } finally {
      await deleteApp(
        algod,
        { from: issuerAddress, appIndex: sbt.message.appIndex },
        secretKey
      );
    }
  });
});
