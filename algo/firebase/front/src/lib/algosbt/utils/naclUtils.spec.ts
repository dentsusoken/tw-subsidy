import { expect } from 'chai';
import {
  randomBytes,
  randomSeed,
  keyPairFromSeed,
  keyPair,
  seedFromSecretKey,
  publicKeyFromSecretKey,
  sign,
  verify,
} from './naclUtils';

describe('naclUtils', () => {
  it('randomBytes should work', () => {
    const bytes = randomBytes(32);
    expect(bytes.length).to.eq(32);
  });

  it('randomSeed should work', () => {
    const seed = randomSeed();
    expect(seed.length).to.eq(32);
  });

  it('keyPairFromSeed should work', () => {
    const seed = randomSeed();
    const keys = keyPairFromSeed(seed);

    expect(keys.publicKey.length).to.eq(32);
    expect(keys.secretKey.length).to.eq(64);
  });

  it('keyPair should work', () => {
    const keys = keyPair();

    expect(keys.publicKey.length).to.eq(32);
    expect(keys.secretKey.length).to.eq(64);
  });

  it('seedFromSecretKey should work', () => {
    const seed = randomSeed();
    const keys = keyPairFromSeed(seed);

    expect(seedFromSecretKey(keys.secretKey)).to.eql(seed);
  });

  it('publicKeyFromSecretKey should work', () => {
    const keys = keyPair();

    expect(publicKeyFromSecretKey(keys.secretKey)).to.eql(keys.publicKey);
  });

  it('sign should work', () => {
    const keys = keyPair();
    const message = Buffer.from('Hello');
    const signature = sign(message, keys.secretKey);

    expect(signature).to.not.empty;
  });

  it('verify should work', () => {
    const keys = keyPair();
    const message = Buffer.from('Hello');
    const signature = sign(message, keys.secretKey);

    expect(verify(message, signature, keys.publicKey)).to.be.true;
  });
});
