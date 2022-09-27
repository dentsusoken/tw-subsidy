import { expect } from 'chai';
import { generateAccount } from 'algosdk';
import {
  createSalt,
  createKey,
  encryptByPassword,
  decryptByPassword,
  encryptBySecretKey,
  decryptBySecretKey,
} from './cryptUtils';

describe('cryptUtils', () => {
  it('createSalt should work', () => {
    console.log(createSalt('abcdefgh'));
    expect(createSalt('abcdefgh')).to.not.empty;
  });

  it('createKey should work', () => {
    const key = createKey('abcdefgh');
    console.log(key.length, key);
    expect(key).to.not.empty;
  });

  it('encryptByPassword should work', () => {
    console.log(encryptByPassword('Hello', 'abcdefgh'));
    expect(encryptByPassword('Hello', 'abcdefgh')).to.not.empty;
  });

  it('decryptByPassword should work', () => {
    const encData = encryptByPassword('Hello', 'abcdefgh');
    expect(decryptByPassword(encData, 'abcdefgh')).to.eq('Hello');
  });

  it('encryptBySecretKey should work', () => {
    const account = generateAccount();

    console.log(encryptBySecretKey('Hello', account.sk));
    expect(encryptBySecretKey('Hello', account.sk)).to.not.empty;
  });

  it('decryptBySecretKey should work', () => {
    const account = generateAccount();

    const encData = encryptBySecretKey('Hello', account.sk);
    expect(decryptBySecretKey(encData, account.sk)).to.eq('Hello');
  });
});
