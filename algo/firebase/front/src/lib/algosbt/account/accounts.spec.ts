import { expect } from 'chai';

import * as accounts from './accounts';

describe('accounts', () => {
  it('should work', async () => {
    expect(accounts.test1Account).to.not.be.empty;
    expect(accounts.test2Account).to.not.be.empty;
    expect(accounts.test3Account).to.not.be.empty;
  });
});
