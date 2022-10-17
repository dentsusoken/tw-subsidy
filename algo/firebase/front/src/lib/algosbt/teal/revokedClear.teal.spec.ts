import { expect } from 'chai';

import teal from './revokedClear.teal';

describe('revokedClearTeal', () => {
  it('import should work', () => {
    expect(teal).to.not.be.undefined;
  });
});
