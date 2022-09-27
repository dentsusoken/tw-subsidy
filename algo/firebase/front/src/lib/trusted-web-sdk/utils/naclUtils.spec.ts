import { expect } from 'chai';
import nacl from 'tweetnacl';
import {
  randomBytes,
  randomSeed,
  keyPairFromSeed,
  keyPair,
  seedFromSecretKey,
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
    const seed = randomBytes(nacl.box.secretKeyLength);
    const pair = keyPairFromSeed(seed);

    expect(pair.publicKey.length).to.eq(32);
    expect(pair.secretKey.length).to.eq(64);
  });

  it('keyPair should work', () => {
    const pair = keyPair();

    expect(pair.publicKey.length).to.eq(32);
    expect(pair.secretKey.length).to.eq(64);
  });

  it('seedFromSecretKey should work', () => {
    const seed = randomBytes(nacl.box.secretKeyLength);
    const pair = keyPairFromSeed(seed);

    expect(seedFromSecretKey(pair.secretKey)).to.eql(seed);
  });

  it('sign should work', () => {
    const pair = keyPair();
    const message = Buffer.from('Hello');
    const signature = sign(message, pair.secretKey);

    expect(signature).to.not.empty;
  });

  it('verify should work', () => {
    const pair = keyPair();
    const message = Buffer.from('Hello');
    const signature = sign(message, pair.secretKey);

    expect(verify(message, signature, pair.publicKey)).to.be.true;
  });
});
