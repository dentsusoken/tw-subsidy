import { expect } from 'chai';
import shortenAddress from '@/lib/utils/shortenAddress';

describe('simplest test:', () => {
  it('should work', () => {
    expect(shortenAddress('abcdefg', 3)).to.equal('abc...efg');
  });
});
