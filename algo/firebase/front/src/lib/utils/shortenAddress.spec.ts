import { expect } from 'chai';
import shortenAddress from '@/lib/utils/shortenAddress';

describe('shortenAddress', () => {
  it('should work', () => {
    expect(shortenAddress('abcdefg', 3)).to.equal('abc...efg');
  });
});
