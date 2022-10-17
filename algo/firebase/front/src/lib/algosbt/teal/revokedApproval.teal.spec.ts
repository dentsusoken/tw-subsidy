import { expect } from 'chai';

import teal from './revokedApproval.teal';

describe('revoked_asc1_approval', () => {
  it('import should work', () => {
    expect(teal).to.not.be.undefined;
  });
});
