import { expect } from 'chai';

import {
  createEncAccount,
  restoreEncAccount,
  createSBTRequest,
  verifySBTRequest,
  createSBT,
  verifySBT,
} from '.';
import { decryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';

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
    expect(req.message).to.eq(message);
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

  it('createSBT should work', () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderEncAccount = createEncAccount(holderPassword);
    const issuerEncAccount = createEncAccount(issuerPassword);

    const secretKey = decryptByPassword(
      issuerEncAccount.encSecretKey,
      issuerPassword
    );
    const message = {
      name: 'Yasuo',
    };

    const sbt = createSBT(
      holderEncAccount.address,
      issuerEncAccount.address,
      message,
      secretKey
    );

    expect(sbt.holderAddress).to.eq(holderEncAccount.address);
    expect(sbt.issuerAddress).to.eq(issuerEncAccount.address);
    expect(sbt.message).to.eq(message);
    expect(sbt.signature).to.not.be.empty;
  });

  it('createSBT should work', () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderEncAccount = createEncAccount(holderPassword);
    const issuerEncAccount = createEncAccount(issuerPassword);

    const secretKey = decryptByPassword(
      issuerEncAccount.encSecretKey,
      issuerPassword
    );
    const message = {
      name: 'Yasuo',
    };

    const sbt = createSBT(
      holderEncAccount.address,
      issuerEncAccount.address,
      message,
      secretKey
    );

    expect(verifySBT(sbt)).to.be.true;
  });
});
