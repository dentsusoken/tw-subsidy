import { expect } from 'chai';
import { generateAccount } from 'algosdk';

import {
  genericHash,
  createKey,
  encrypt,
  decrypt,
  encryptSeed,
  decryptSeed,
  encryptByPassword,
  decryptByPassword,
  encryptBySecretKey,
  decryptBySecretKey,
  secretKeyFromEncSeed,
} from './cryptUtils';
import { keyPair, randomSeed, seedFromSecretKey } from './naclUtils';

describe('cryptUtils', () => {
  it('genericHash should work', () => {
    expect(genericHash('abcdefgh').length).to.eq(32);
  });

  it('createKey should work', () => {
    const key = createKey('abcdefgh');
    expect(key.length).to.eq(32);
  });

  it('encrypt should work', () => {
    const data = new TextEncoder().encode('Hello');
    const key = createKey('abcdefgh');
    const encData = encrypt(data, key);

    expect(encData).to.not.empty;
  });

  it('decrypt should work', () => {
    const data = new TextEncoder().encode('Hello');
    const key = createKey('abcdefgh');
    const encData = encrypt(data, key);

    expect(decrypt(encData, key)).to.eql(data);
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

  it('secretKeyFromEncSeed should work', () => {
    const keys = keyPair();
    const seed = seedFromSecretKey(keys.secretKey);
    const password = 'abcdefgh';
    const encData = encryptSeed(seed, password);

    expect(secretKeyFromEncSeed(encData, password)).to.eql(keys.secretKey);
  });
});
