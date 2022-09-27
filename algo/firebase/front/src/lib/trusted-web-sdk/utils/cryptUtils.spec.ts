import { expect } from 'chai';
import { generateAccount } from 'algosdk';
import {
  createSalt,
  createKey,
  encryptSeed,
  decryptSeed,
  encryptByPassword,
  decryptByPassword,
  encryptBySecretKey,
  decryptBySecretKey,
} from './cryptUtils';
import { randomSeed } from './naclUtils';

describe('cryptUtils', () => {
  it('createSalt should work', () => {
    expect(createSalt('abcdefgh')).to.not.empty;
  });

  it('createKey should work', () => {
    const key = createKey('abcdefgh');
    expect(key).to.not.empty;
  });

  it('encryptSeed should work', () => {
    const seed = randomSeed();
    const encData = encryptSeed(seed, 'abcdefgh');

    expect(encData).to.not.empty;
  });

  it('decryptSeed should work', () => {
    const seed = randomSeed();
    const encData = encryptSeed(seed, 'abcdefgh');

    expect(decryptSeed(encData, 'abcdefgh')).to.eql(seed);
  });

  it('encryptByPassword should work', () => {
    expect(encryptByPassword('Hello', 'abcdefgh')).to.not.empty;
  });

  it('decryptByPassword should work', () => {
    const encData = encryptByPassword('Hello', 'abcdefgh');
    expect(decryptByPassword(encData, 'abcdefgh')).to.eq('Hello');
  });

  it('encryptBySecretKey should work', () => {
    const account = generateAccount();

    expect(encryptBySecretKey('Hello', account.sk)).to.not.empty;
  });

  it('decryptBySecretKey should work', () => {
    const account = generateAccount();

    const encData = encryptBySecretKey('Hello', account.sk);
    expect(decryptBySecretKey(encData, account.sk)).to.eq('Hello');
  });
});
