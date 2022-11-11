import { expect } from 'chai';
import shortenString from './shortenString';

describe('shortenString', () => {
  it('should work', () => {
    expect(shortenString('abcdefghijklmnopqrstuvwxyz')).to.equal(
      'abcdef...uvwxyz'
    );
    expect(shortenString('abcdefg')).to.equal('abcdefg');
  });
});
